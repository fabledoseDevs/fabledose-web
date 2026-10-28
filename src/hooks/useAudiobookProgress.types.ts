import type { FableLocale } from '@/fables/fables.types';

/**
 * @module
 * Account-owned audiobook checkpoints and persistence feedback.
 */

/**
 * Identifies the account, language and recording whose playback is being restored.
 *
 * @remarks
 * Changing any identity input invalidates visible state immediately. The hook does not
 * start playback or request new billing features. Signed-out listening stays ephemeral.
 *
 * @example
 * ```ts
 * const progress = useAudiobookProgress({ userId, fableId, locale: 'pl', source, enabled: true });
 * ```
 */
export interface AudiobookProgressOptions {
  /** Current authenticated UID or null. */
  userId: string | null;
  /** Child library ID; omitted or null keeps existing parent checkpoints. */
  profileId?: string | null;
  /** Stable story identifier. */
  fableId: string;
  /** Recording language. */
  locale: FableLocale;
  /** Resolved audio URL; a changed recording does not reuse an old position. */
  source: string;
  /** True only while the audiobook route is active. */
  enabled: boolean;
}

/**
 * Restored position, lifecycle callbacks and recoverable persistence state.
 *
 * @remarks
 * Record updates are held locally; writes run every 15 seconds and on explicit commits,
 * hidden tabs, pagehide and layout cleanup. Session guards discard old-account results.
 * Failed writes retain the newest checkpoint for retry; reading failures block restoration.
 *
 * @example
 * ```tsx
 * <Audiobook initialPositionSeconds={progress.initialPosition}
 *   onPlaybackPositionChange={progress.record} onPlaybackCommit={progress.commit} />
 * ```
 */
export interface AudiobookProgressResult {
  /** Whether the active identity has finished loading its saved checkpoint. */
  ready: boolean;
  /** Zero for new or completed recordings, otherwise the saved seconds. */
  initialPosition: number;
  /** Latest position update; does not write on every media tick. */
  record: (seconds: number, duration: number) => void;
  /** Records and immediately submits a pause, seek, exit or completion checkpoint. */
  commit: (seconds: number, duration: number, completed?: boolean) => void;
  /** True while a current-account write is awaiting acknowledgement. */
  saving: boolean;
  /** Current load failure, or null. */
  readError: Error | null;
  /** Current write failure, or null; listening can continue. */
  saveError: Error | null;
  /** Reloads the saved position after a read failure. */
  retryRead: () => void;
  /** Saves the latest checkpoint, including movement since the failed write. */
  retrySave: () => void;
}
