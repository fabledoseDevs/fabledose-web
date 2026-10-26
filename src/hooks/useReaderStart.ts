import { useCallback, useEffect, useRef, useState } from 'react';

import type {
  ReaderStartOptions,
  ReaderStartResult,
} from './useReaderStart.types';

export const useReaderStart = ({
  userId,
  authChecked,
  accountRevision,
  fableId,
  enabled,
  initialSlide,
  getProgress,
}: ReaderStartOptions): ReaderStartResult => {
  const firstSession = useRef<number | null>(null);
  const [retryRevision, setRetryRevision] = useState(0);
  const key = `${accountRevision}/${userId}/${fableId}/${enabled}/${initialSlide}/${retryRevision}`;
  const [start, setStart] = useState({ key: '', slide: 0 });
  useEffect(() => {
    if (!authChecked) return;
    if (firstSession.current === null) firstSession.current = accountRevision;
    if (!enabled) return;
    let active = true;
    const load = async () => {
      const progress = userId ? await getProgress(fableId) : null;
      if (!active) return;
      const explicit =
        firstSession.current === accountRevision && initialSlide !== undefined;
      setStart({
        key,
        slide: explicit
          ? initialSlide
          : progress && !progress.isCompleted
          ? progress.currentSlide
          : 0,
      });
    };
    void load();
    return () => {
      active = false;
    };
  }, [
    authChecked,
    accountRevision,
    userId,
    fableId,
    enabled,
    initialSlide,
    getProgress,
    key,
  ]);
  const retry = useCallback(() => setRetryRevision(value => value + 1), []);
  return { ready: authChecked && start.key === key, slide: start.slide, retry };
};

/** Keeps refreshes at the visible slide without reloading the page or adding history entries. */
export const updateReaderLocation = (slide: number): void => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (url.searchParams.get('slide') === String(slide)) return;
  url.searchParams.set('slide', String(slide));
  window.history.replaceState(null, '', url);
};
