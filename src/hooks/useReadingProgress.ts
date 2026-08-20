'use client';

import { useCallback, useState } from 'react';

import {
  getReadingProgress,
  updateReadingProgress,
  type ReadingProgressData,
} from '@/config/firestore';
import { useReadingProgressContext } from '@/contexts/ReadingProgressContext';

interface UseReadingProgressResult {
  saveProgress: (
    fableId: string,
    currentSlide: number,
    isCompleted?: boolean,
  ) => Promise<void>;
  getProgress: (fableId: string) => Promise<ReadingProgressData | null>;
  loading: boolean;
  error: Error | null;
}

export const useReadingProgress = (
  userId: string | null,
): UseReadingProgressResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const contextCache = useReadingProgressContext();

  const saveProgress = useCallback(
    async (
      fableId: string,
      currentSlide: number,
      isCompleted = false,
    ) => {
      if (!userId) return;

      const progress: ReadingProgressData = {
        fableId,
        currentSlide,
        isCompleted,
        lastUpdated: Date.now(),
      };
      
      // Update cache immediately for instant UI feedback
      contextCache.setProgress(fableId, progress);

      // Update Firebase in background
      try {
        await updateReadingProgress(
          userId,
          fableId,
          currentSlide,
          isCompleted,
        );
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to save progress'),
        );
      }
    },
    [userId, contextCache],
  );

  const getProgress = useCallback(
    async (fableId: string): Promise<ReadingProgressData | null> => {
      // Return cached value immediately if available
      const cached = contextCache.getProgress(fableId);
      if (cached) {
        return cached;
      }

      if (!userId) return null;

      // Fetch from Firebase in background
      try {
        setLoading(true);
        const progress = await getReadingProgress(userId, fableId);
        if (progress) {
          contextCache.setProgress(fableId, progress);
        }
        setError(null);
        return progress;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load progress'),
        );
        return null;
      } finally {
        setLoading(false);
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
