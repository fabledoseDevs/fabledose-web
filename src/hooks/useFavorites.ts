'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  addFavorite,
  getContinueReading,
  getFavorites,
  removeFavorite,
  type FavoriteData,
  type ReadingProgressData,
} from '@/config/firestore';

interface UseFavoritesResult {
  favorites: FavoriteData[];
  continueReading: ReadingProgressData[];
  loading: boolean;
  error: Error | null;
  toggleFavorite: (fableId: string) => Promise<void>;
  isFavorited: (fableId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

export const useFavorites = (userId: string | null): UseFavoritesResult => {
  const [favorites, setFavorites] = useState<FavoriteData[]>([]);
  const [continueReading, setContinueReading] = useState<ReadingProgressData[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshFavorites = useCallback(async () => {
    if (!userId) {
      setFavorites([]);
      setContinueReading([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [favs, continuing] = await Promise.all([
        getFavorites(userId),
        getContinueReading(userId),
      ]);
      setFavorites(favs);
      setContinueReading(continuing);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load favorites'));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refreshFavorites();
  }, [refreshFavorites]);

  const isFavorited = (fableId: string): boolean => {
    return favorites.some(f => f.fableId === fableId);
  };

  const toggleFavorite = useCallback(
    async (fableId: string) => {
      if (!userId) {
        return;
      }

      try {
        const isFaved = favorites.some(f => f.fableId === fableId);
        
        if (isFaved) {
          setFavorites(prev => prev.filter(f => f.fableId !== fableId));
          await removeFavorite(userId, fableId);
        } else {
          setFavorites(prev => [
            ...prev,
            { fableId, addedAt: Date.now() },
          ]);
          await addFavorite(userId, fableId);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to toggle favorite'),
        );
        void refreshFavorites();
      }
    },
    [userId, favorites, refreshFavorites],
  );

  return {
    favorites,
    continueReading,
    loading,
    error,
    toggleFavorite,
    isFavorited,
    refreshFavorites,
  };
};
