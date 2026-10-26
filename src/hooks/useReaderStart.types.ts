import type { ReadingProgressData } from '@/config/firestore';
/**
 * @module
 * Initial reader position.
 *
 * Defines contracts shared by the library UI and its session-aware persistence layer.
 */

/**
 * Inputs for resolving the initial slide for an account and story.
 *
 * @remarks
 * An explicit route slide applies only to the initial authenticated session. Otherwise unfinished saved progress is used; completed stories start at zero.
 *
 * @example
 * ```ts
 * const start = useReaderStart({ userId, authChecked, accountRevision, fableId, enabled: true, getProgress });
 * ```
 */
export interface ReaderStartOptions {
  /** Current Firebase UID, or null for a signed-out reader. */
  userId: string | null;
  /** Whether the first authentication result has arrived. */
  authChecked: boolean;
  /** Revision that invalidates positions when authentication changes. */
  accountRevision: number;
  /** Stable catalogue identifier of the story. */
  fableId: string;
  /** Whether the reading view should resolve its starting position. */
  enabled: boolean;
  /** Optional zero-based route position, honored only in the initial account session. */
  initialSlide?: number;
  /** Loads current-session cached or persisted progress for a story. */
  getProgress: (fableId: string) => Promise<ReadingProgressData | null>;
}
/**
 * Resolved reader position and an explicit reload action.
 *
 * @remarks
 * Mount the slideshow only when ready and the progress hook has no read error. An account or route change hides the previous position immediately.
 *
 * @example
 * ```ts
 * if (start.ready) mountReader(start.slide);
 * ```
 */
export interface ReaderStartResult {
  /** Whether the position belongs to the current inputs and can initialize the reader. */
  ready: boolean;
  /** Resolved zero-based starting slide. */
  slide: number;
  /** Reloads the starting position after a failed read or an acknowledged reset. */
  retry: () => void;
}
