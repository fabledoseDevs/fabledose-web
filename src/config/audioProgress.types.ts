import type { FableLocale } from '@/fables/fables.types';

/**
 * @module
 * Durable audiobook position, independent of text-slide progress.
 */

/**
 * An acknowledged or pending audiobook checkpoint for one story and language.
 *
 * @remarks
 * Stored under users/{uid}/readingProgress/{fableId}/audioProgress/{locale}.
 * The source URL identifies the recording; replacing it starts a new listening session.
 * Seconds are never interpreted as slide indexes. Completion restarts playback at zero.
 *
 * @example
 * ```ts
 * const checkpoint: AudioProgressData = {
 *   fableId: 'goldilocks', locale: 'pl', source: '/audio/story-pl.mp3',
 *   positionSeconds: 42, durationSeconds: 300, isCompleted: false, lastUpdated: Date.now(),
 * };
 * ```
 */
export interface AudioProgressData {
  /** Stable catalogue identifier. */
  fableId: string;
  /** Language of the recording, not a global player preference. */
  locale: FableLocale;
  /** Exact resolved recording URL used to invalidate obsolete checkpoints. */
  source: string;
  /** Finite non-negative position, clamped to the recording duration. */
  positionSeconds: number;
  /** Finite positive duration reported by the media element. */
  durationSeconds: number;
  /** True after the recording ends; the next visit starts at zero. */
  isCompleted: boolean;
  /** Client checkpoint timestamp in milliseconds. */
  lastUpdated: number;
}
