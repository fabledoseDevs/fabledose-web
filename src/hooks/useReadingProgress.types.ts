import type { ReadingProgressData } from '@/config/firestore';

import type { AccountSession } from './useAccountSession.types';

/**
 * @module
 * Persistent reading progress.
 *
 * Defines contracts shared by the library UI and its session-aware persistence layer.
 */

/**
 * Retains the exact position and completion flag of a failed save.
 *
 * @remarks
 * The captured session prevents retrying one account’s position after switching accounts.
 *
 * @example
 * ```ts
 * const failed: FailedProgressSave = { session, fableId, currentSlide: 2, isCompleted: false };
 * ```
 */
export interface FailedProgressSave {
  /** Captured login owning these records or this operation; null represents no matching account. */
  session: AccountSession;
  /** Stable catalogue identifier of the story. */
  fableId: string;
  /** Zero-based slide index; zero with false completion restarts the story. */
  currentSlide: number;
  /** Whether the saved story has been completed. */
  isCompleted: boolean;
}

/**
 * Account-scoped operations for reading, saving and retrying story progress.
 *
 * @remarks
 * Writes are ordered per story. Reads wait for queued writes before using cached or persisted data. Saving slide zero with isCompleted false resets the story. Failed writes clear their optimistic cached position.
 *
 * @example
 * ```ts
 * const progress = useReadingProgress(userId);
 * const saved = await progress.saveProgress(fableId, 0, false);
 * if (!saved && progress.canRetrySave) showRetryAction();
 * ```
 */
export interface UseReadingProgressResult {
  /** Persists a non-negative integer slide in document order; resolves false on failure or stale ownership. */
  saveProgress: (
    fableId: string,
    currentSlide: number,
    isCompleted?: boolean,
  ) => Promise<boolean>;
  /** Loads current-session cached or persisted progress for a story. */
  getProgress: (fableId: string) => Promise<ReadingProgressData | null>;
  /** Whether account data is being fetched. */
  loading: boolean;
  /** Whether one or more progress writes are awaiting acknowledgement. */
  saving: boolean;
  /** Repeats the latest failed position and completion flag; resolves false if it cannot be saved. */
  retrySave: () => Promise<boolean>;
  /** Whether the retained failed save still belongs to the active session. */
  canRetrySave: boolean;
  /** Latest read failure for the active session, or null. */
  readError: Error | null;
  /** Latest save failure; the reader remains usable while this is shown. */
  saveError: Error | null;
  /** Latest operation failure for this consumer, or null. */
  error: Error | null;
}
