'use client';

import { createContext, useContext, useCallback, useRef, type ReactNode } from 'react';

import type { ReadingProgressData } from '@/config/firestore';

interface ReadingProgressContextType {
  getProgress: (fableId: string) => ReadingProgressData | null;
  setProgress: (fableId: string, progress: ReadingProgressData) => void;
  clearProgress: (fableId: string) => void;
}

const ReadingProgressContext = createContext<ReadingProgressContextType | undefined>(undefined);

export const ReadingProgressProvider = ({ children }: { children: ReactNode }) => {
  const cacheRef = useRef<Map<string, ReadingProgressData>>(new Map());

  const getProgress = useCallback((fableId: string): ReadingProgressData | null => {
    return cacheRef.current.get(fableId) || null;
  }, []);

  const setProgress = useCallback((fableId: string, progress: ReadingProgressData) => {
    cacheRef.current.set(fableId, progress);
  }, []);

  const clearProgress = useCallback((fableId: string) => {
    cacheRef.current.delete(fableId);
  }, []);

  return (
    <ReadingProgressContext.Provider value={{ getProgress, setProgress, clearProgress }}>
      {children}
    </ReadingProgressContext.Provider>
  );
};

export const useReadingProgressContext = () => {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    throw new Error('useReadingProgressContext must be used within ReadingProgressProvider');
  }
  return context;
};
