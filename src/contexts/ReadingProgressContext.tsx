'use client';

import { onAuthStateChanged } from 'firebase/auth';
import {
  type ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { auth } from '@/config/firebase';
import type { ReadingProgressData } from '@/config/firestore';

import type {
  ReadingProgressContextType,
  ReadingProgressProviderProps,
} from './ReadingProgressContext.types';

const ReadingProgressContext = createContext<
  ReadingProgressContextType | undefined
>(undefined);

export const ReadingProgressProvider = ({
  children,
}: ReadingProgressProviderProps): ReactElement => {
  const cacheRef = useRef(new Map<string, ReadingProgressData>());
  const ownerRef = useRef<string | null>(null);
  const syncOwner = useCallback((): string | null => {
    const owner = auth.currentUser?.uid ?? null;
    if (owner !== ownerRef.current) {
      cacheRef.current.clear();
      ownerRef.current = owner;
    }
    return owner;
  }, []);
  useEffect(
    () =>
      onAuthStateChanged(auth, () => {
        syncOwner();
      }),
    [syncOwner],
  );
  const getProgress = useCallback(
    (userId: string, fableId: string): ReadingProgressData | null =>
      syncOwner() === userId ? cacheRef.current.get(fableId) || null : null,
    [syncOwner],
  );
  const setProgress = useCallback(
    (
      userId: string,
      fableId: string,
      progress: ReadingProgressData,
    ): boolean => {
      if (syncOwner() !== userId) return false;
      cacheRef.current.set(fableId, progress);
      return true;
    },
    [syncOwner],
  );
  const clearProgress = useCallback(
    (userId: string, fableId: string): void => {
      if (syncOwner() === userId) cacheRef.current.delete(fableId);
    },
    [syncOwner],
  );
  const value = useMemo(
    () => ({ getProgress, setProgress, clearProgress }),
    [getProgress, setProgress, clearProgress],
  );
  return (
    <ReadingProgressContext.Provider value={value}>
      {children}
    </ReadingProgressContext.Provider>
  );
};

export const useReadingProgressContext = (): ReadingProgressContextType => {
  const context = useContext(ReadingProgressContext);
  if (!context)
    throw new Error(
      'useReadingProgressContext must be used within ReadingProgressProvider',
    );
  return context;
};
