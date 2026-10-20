'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { auth } from '@/config/firebase';
import {
  type ReadingProgressData,
  getReadingProgress,
  updateReadingProgress,
} from '@/config/firestore';
import { useReadingProgressContext } from '@/contexts/ReadingProgressContext';

import type { UseReadingProgressResult } from './useReadingProgress.types';

export const useReadingProgress = (
  userId: string | null,
): UseReadingProgressResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const pendingReads = useRef(
    new Map<string, Promise<ReadingProgressData | null>>(),
  );
  const contextCache = useReadingProgressContext();
  useEffect(() => {
    setError(null);
    setLoading(false);
  }, [userId]);

  const saveProgress = useCallback(
    async (fableId: string, currentSlide: number, isCompleted = false) => {
      if (!userId || auth.currentUser?.uid !== userId) return false;

      const progress: ReadingProgressData = {
        fableId,
        currentSlide,
        isCompleted,
        lastUpdated: Date.now(),
      };

      // Update cache immediately for instant UI feedback
      contextCache.setProgress(userId, fableId, progress);

      // Update Firebase in background
      try {
        await updateReadingProgress(userId, fableId, currentSlide, isCompleted);
        if (auth.currentUser?.uid === userId) setError(null);
        return auth.currentUser?.uid === userId;
      } catch (err) {
        if (contextCache.getProgress(userId, fableId) === progress)
          contextCache.clearProgress(userId, fableId);
        if (auth.currentUser?.uid === userId)
          setError(
            err instanceof Error ? err : new Error('Failed to save progress'),
          );
        return false;
      }
    },
    [userId, contextCache],
  );

  const getProgress = useCallback(
    async (fableId: string): Promise<ReadingProgressData | null> => {
      // Return cached value immediately if available
      if (!userId || auth.currentUser?.uid !== userId) return null;
      const cached = contextCache.getProgress(userId, fableId);
      if (cached) {
        return cached;
      }

      // Fetch from Firebase in background
      try {
        setLoading(true);
        const key = `${userId}/${fableId}`;
        let request = pendingReads.current.get(key);
        if (!request) {
          request = getReadingProgress(userId, fableId);
          pendingReads.current.set(key, request);
          void request
            .finally(() => pendingReads.current.delete(key))
            .catch(() => undefined);
        }
        const progress = await request;
        if (auth.currentUser?.uid !== userId) return null;
        const newer = contextCache.getProgress(userId, fableId);
        if (newer) return newer;
        if (progress) {
          contextCache.setProgress(userId, fableId, progress);
        }
        setError(null);
        return progress;
      } catch (err) {
        if (auth.currentUser?.uid === userId)
          setError(
            err instanceof Error ? err : new Error('Failed to load progress'),
          );
        return null;
      } finally {
        if (auth.currentUser?.uid === userId) setLoading(false);
      }
    },
    [userId, contextCache],
  );

  return {
    saveProgress,
    getProgress,
    loading,
    error,
  };
};
