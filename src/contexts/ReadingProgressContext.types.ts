import type { ReactNode } from 'react';

import type { ReadingProgressData } from '@/config/firestore';

/**
 * Cache isolated to the currently authenticated user; stale session calls are ignored.
 *
 * @property getProgress - Reads a fable only when userId matches the active Firebase user.
 * @property setProgress - Caches progress for the active user and returns whether it was accepted.
 * @property clearProgress - Removes a cached entry; persistence is handled by the progress hook.
 */
export interface ReadingProgressContextType {
  getProgress: (userId: string, fableId: string) => ReadingProgressData | null;
  setProgress: (
    userId: string,
    fableId: string,
    progress: ReadingProgressData,
  ) => boolean;
  clearProgress: (userId: string, fableId: string) => void;
}

/** Provider properties. @property children - Components sharing the active user's progress cache. */
export interface ReadingProgressProviderProps {
  children: ReactNode;
}
