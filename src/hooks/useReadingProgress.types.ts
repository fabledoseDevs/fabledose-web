import type { ReadingProgressData } from '@/config/firestore';

/**
 * Account-scoped reading progress operations.
 *
 * @property saveProgress - Saves in document order; returns false on failure or a stale session. Slide zero and false completion reset reading persistently.
 * @property getProgress - Reads cached or persisted progress only for the current user.
 * @property loading - Whether progress is being fetched.
 * @property error - Last progress operation error for this hook instance.
 */
export interface UseReadingProgressResult {
  saveProgress: (
    fableId: string,
    currentSlide: number,
    isCompleted?: boolean,
  ) => Promise<boolean>;
  getProgress: (fableId: string) => Promise<ReadingProgressData | null>;
  loading: boolean;
  error: Error | null;
}
