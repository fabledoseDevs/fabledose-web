'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  addFavorite,
  getContinueReading,
  getFavorites,
  removeFavorite,
} from '@/config/firestore';

import { useAccountSession } from './useAccountSession';
import type {
  FavoriteMutation,
  FavoritesSnapshot,
  FavoriteWriteResult,
  UseFavoritesResult,
} from './useFavorites.types';

const EMPTY_FAVORITES: FavoritesSnapshot['favorites'] = [];
const EMPTY_CONTINUING: FavoritesSnapshot['continueReading'] = [];

const emptySnapshot = (): FavoritesSnapshot => ({
  session: null,
  favorites: [],
  continueReading: [],
  loading: false,
  readError: null,
  writeError: null,
  pendingIds: [],
});

export const useFavorites = (userId: string | null): UseFavoritesResult => {
  const { capture, isCurrent, revision } = useAccountSession(userId);
  const [snapshot, setSnapshot] = useState<FavoritesSnapshot>(emptySnapshot);
  const current = useRef(snapshot);
  const reads = useRef(0);
  const pending = useRef(
    new Map<
      string,
      { mutation: FavoriteMutation; promise: Promise<FavoriteWriteResult> }
    >(),
  );
  const failed = useRef<FavoriteMutation | null>(null);
  const apply = useCallback(
    (update: (previous: FavoritesSnapshot) => FavoritesSnapshot): void => {
      current.current = update(current.current);
      setSnapshot(current.current);
    },
    [],
  );

  const refreshFavorites = useCallback(async (): Promise<void> => {
    const session = capture();
    const request = ++reads.current;
    if (!session) {
      failed.current = null;
      apply(emptySnapshot);
      return;
    }
    apply(previous => ({
      ...(isCurrent(previous.session) ? previous : emptySnapshot()),
      session,
      loading: true,
      readError: null,
    }));
    try {
      await Promise.all(
        [...pending.current.values()]
          .filter(entry => isCurrent(entry.mutation.session))
          .map(entry => entry.promise),
      );
      if (!isCurrent(session) || request !== reads.current) return;
      const [favorites, continueReading] = await Promise.all([
        getFavorites(session.uid),
        getContinueReading(session.uid),
      ]);
      if (!isCurrent(session) || request !== reads.current) return;
      apply(previous => ({
        ...previous,
        session,
        favorites,
        continueReading,
        loading: false,
        readError: null,
      }));
    } catch (cause: unknown) {
      if (isCurrent(session) && request === reads.current)
        apply(previous => ({
          ...previous,
          loading: false,
          readError:
            cause instanceof Error
              ? cause
              : new Error('Failed to load library'),
        }));
    }
  }, [capture, isCurrent, apply]);

  useEffect(() => {
    void refreshFavorites();
    const refresh = () => {
      if (document.visibilityState !== 'hidden') void refreshFavorites();
    };
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    return () => {
      ++reads.current;
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
    };
  }, [refreshFavorites, revision]);

  const writeFavorite = useCallback(
    (fableId: string, wanted: boolean): Promise<FavoriteWriteResult> => {
      const session = capture();
      if (
        !session ||
        !isCurrent(current.current.session) ||
        current.current.loading
      )
        return Promise.resolve(null);
      const key = `${session.uid}/${fableId}`;
      const existing = pending.current.get(key);
      if (existing && isCurrent(existing.mutation.session))
        return Promise.resolve(null);
      const mutation = { session, fableId, wanted };
      ++reads.current;
      failed.current = null;
      apply(previous => ({
        ...previous,
        writeError: null,
        pendingIds: [...previous.pendingIds, fableId],
      }));
      const promise = (async (): Promise<FavoriteWriteResult> => {
        // Register the pending operation before a dependency can synchronously reject.
        await Promise.resolve();
        try {
          if (!isCurrent(session)) return null;
          if (wanted) await addFavorite(session.uid, fableId);
          else await removeFavorite(session.uid, fableId);
          if (!isCurrent(session)) return null;
          apply(previous => ({
            ...previous,
            writeError: null,
            favorites: wanted
              ? [
                  ...previous.favorites.filter(
                    item => item.fableId !== fableId,
                  ),
                  { fableId, addedAt: Date.now() },
                ]
              : previous.favorites.filter(item => item.fableId !== fableId),
          }));
          return wanted ? 'added' : 'removed';
        } catch (cause: unknown) {
          if (isCurrent(session)) {
            failed.current = mutation;
            apply(previous => ({
              ...previous,
              writeError:
                cause instanceof Error
                  ? cause
                  : new Error('Failed to save favorite'),
            }));
          }
          return null;
        } finally {
          if (pending.current.get(key)?.mutation === mutation)
            pending.current.delete(key);
          if (isCurrent(session))
            apply(previous => ({
              ...previous,
              pendingIds: previous.pendingIds.filter(id => id !== fableId),
            }));
        }
      })();
      pending.current.set(key, { mutation, promise });
      return promise;
    },
    [capture, isCurrent, apply],
  );

  const toggleFavorite = useCallback(
    (fableId: string): Promise<FavoriteWriteResult> =>
      writeFavorite(
        fableId,
        !current.current.favorites.some(item => item.fableId === fableId),
      ),
    [writeFavorite],
  );
  const retryFavorite = useCallback((): Promise<FavoriteWriteResult> => {
    const mutation = failed.current;
    return mutation && isCurrent(mutation.session)
      ? writeFavorite(mutation.fableId, mutation.wanted)
      : Promise.resolve(null);
  }, [isCurrent, writeFavorite]);
  const visible =
    Boolean(userId) &&
    snapshot.session?.uid === userId &&
    isCurrent(snapshot.session);
  return {
    favorites: visible ? snapshot.favorites : EMPTY_FAVORITES,
    continueReading: visible ? snapshot.continueReading : EMPTY_CONTINUING,
    loading: Boolean(userId) && (!visible || snapshot.loading),
    error: visible ? snapshot.writeError || snapshot.readError : null,
    isFavorited: fableId =>
      visible && snapshot.favorites.some(item => item.fableId === fableId),
    isPending: fableId => visible && snapshot.pendingIds.includes(fableId),
    canRetryFavorite:
      visible && Boolean(failed.current && isCurrent(failed.current.session)),
    toggleFavorite,
    retryFavorite,
    refreshFavorites,
  };
};
