import type { FavoriteData, ReadingProgressData } from '@/config/firestore';

import type { AccountSession } from './useAccountSession.types';
/**
 * @module
 * Account favorites and continuation records.
 *
 * Defines contracts shared by the library UI and its session-aware persistence layer.
 */

/**
 * Acknowledged mutation outcome.
 *
 * @remarks
 * Null means failure, a duplicate request or a session that is no longer current; never show a success notification for null.
 */
export type FavoriteWriteResult = 'added' | 'removed' | null;
/**
 * Stores the exact favorite state to repeat after a failed write.
 *
 * @remarks
 * Retries preserve the original intention and session rather than toggling the latest UI state.
 *
 * @example
 * ```ts
 * const mutation: FavoriteMutation = { session, fableId: "goldilocks", wanted: true };
 * ```
 */
export interface FavoriteMutation {
  /** Captured login owning these records or this operation; null represents no matching account. */
  session: AccountSession;
  /** Stable catalogue identifier of the story. */
  fableId: string;
  /** True to add the favorite; false to remove it. */
  wanted: boolean;
}
/**
 * Owns library records, pending writes and errors for one account session.
 *
 * @remarks
 * Consumers hide snapshots that no longer belong to the active login, before replacement data arrives.
 *
 * @example
 * ```ts
 * const isEmpty = !snapshot.loading && snapshot.favorites.length === 0;
 * ```
 */
export interface FavoritesSnapshot {
  /** Captured login owning these records or this operation; null represents no matching account. */
  session: AccountSession | null;
  /** Acknowledged favorite records for the active account. */
  favorites: FavoriteData[];
  /** Saved unfinished reading entries for the active account. */
  continueReading: ReadingProgressData[];
  /** Whether account data is being fetched. */
  loading: boolean;
  /** Latest read failure for the active session, or null. */
  readError: Error | null;
  /** Latest favorite mutation failure for the active session, or null. */
  writeError: Error | null;
  /** Story identifiers whose favorite writes are awaiting acknowledgement. */
  pendingIds: string[];
}
/**
 * Public operations and visible state returned by useFavorites.
 *
 * @remarks
 * Favorite changes become visible only after persistence acknowledges them. Read and write failures remain available for explicit retry.
 *
 * @example
 * ```ts
 * const library = useFavorites(userId);
 * const result = await library.toggleFavorite(fableId);
 * if (result === "added") showSuccess();
 * ```
 */
export interface UseFavoritesResult {
  /** Acknowledged favorite records for the active account. */
  favorites: FavoriteData[];
  /** Saved unfinished reading entries for the active account. */
  continueReading: ReadingProgressData[];
  /** Whether account data is being fetched. */
  loading: boolean;
  /** Latest operation failure for this consumer, or null. */
  error: Error | null;
  /** Reports whether a favorite write is already running for the supplied story. */
  isPending: (fableId: string) => boolean;
  /** Requests the opposite favorite state; resolves to added or removed only after acknowledgement, or null on failure, duplicate or stale session. */
  toggleFavorite: (fableId: string) => Promise<FavoriteWriteResult>;
  /** Reports whether the story belongs to the acknowledged favorite set. */
  isFavorited: (fableId: string) => boolean;
  /** Waits for this consumer’s pending writes and reloads persisted library records. */
  refreshFavorites: () => Promise<void>;
  /** Whether the exact failed favorite mutation still belongs to the current login. */
  canRetryFavorite: boolean;
  /** Repeats the original desired favorite state; returns the acknowledged result or null. */
  retryFavorite: () => Promise<FavoriteWriteResult>;
}
