import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { getAudioProgress, saveAudioProgress } from '@/config/audioProgress';
import type { AudioProgressData } from '@/config/audioProgress.types';

import { useAccountSession } from './useAccountSession';
import type { AccountSession } from './useAccountSession.types';
import type {
  AudiobookProgressOptions,
  AudiobookProgressResult,
} from './useAudiobookProgress.types';

export const useAudiobookProgress = ({
  userId,
  profileId = null,
  fableId,
  locale,
  source,
  enabled,
}: AudiobookProgressOptions): AudiobookProgressResult => {
  const { capture, isCurrent, revision } = useAccountSession(userId, profileId);
  const identity = JSON.stringify([
    revision,
    userId,
    profileId,
    fableId,
    locale,
    source,
    enabled,
  ]);
  const [reload, setReload] = useState(0);
  const [start, setStart] = useState({
    identity: '',
    position: 0,
    error: null as Error | null,
  });
  const [status, setStatus] = useState({
    identity: '',
    writes: 0,
    error: null as Error | null,
  });
  const latest = useRef<{
    session: AccountSession;
    identity: string;
    data: AudioProgressData;
    version: number;
  } | null>(null);
  const submitted = useRef(0);
  const acknowledged = useRef(0);
  const sequence = useRef(0);

  const flush = useCallback(() => {
    const entry = latest.current;
    if (
      !entry ||
      !isCurrent(entry.session) ||
      entry.version <= acknowledged.current ||
      entry.version === submitted.current
    )
      return;
    submitted.current = entry.version;
    setStatus(previous => ({
      identity: entry.identity,
      writes: previous.identity === entry.identity ? previous.writes + 1 : 1,
      error: previous.identity === entry.identity ? previous.error : null,
    }));
    void saveAudioProgress(
      entry.session.uid,
      entry.data,
      entry.session.profileId,
    )
      .then(() => {
        acknowledged.current = Math.max(acknowledged.current, entry.version);
        if (
          isCurrent(entry.session) &&
          latest.current?.version === entry.version
        )
          setStatus(previous => ({ ...previous, error: null }));
      })
      .catch((cause: unknown) => {
        const newestSubmission = submitted.current === entry.version;
        if (newestSubmission) submitted.current = 0;
        if (
          isCurrent(entry.session) &&
          newestSubmission &&
          latest.current?.identity === entry.identity
        )
          setStatus(previous => ({
            ...previous,
            error:
              cause instanceof Error ? cause : new Error('Audio save failed'),
          }));
      })
      .finally(() => {
        if (isCurrent(entry.session))
          setStatus(previous =>
            previous.identity === entry.identity
              ? { ...previous, writes: Math.max(0, previous.writes - 1) }
              : previous,
          );
      });
  }, [isCurrent]);

  // Layout cleanup runs before the session guard's passive cleanup invalidates its token.
  useLayoutEffect(() => () => flush(), [identity, flush]);
  useEffect(() => {
    latest.current = null;
    submitted.current = 0;
    acknowledged.current = 0;
    const session = capture();
    let active = true;
    if (!enabled || !source || !userId) {
      setStart({ identity, position: 0, error: null });
      return;
    }
    if (!session) return;
    void getAudioProgress(
      session.uid,
      fableId,
      locale,
      source,
      session.profileId,
    )
      .then(data => {
        if (active && isCurrent(session))
          setStart({
            identity,
            position: data && !data.isCompleted ? data.positionSeconds : 0,
            error: null,
          });
      })
      .catch((cause: unknown) => {
        if (active && isCurrent(session))
          setStart({
            identity,
            position: 0,
            error:
              cause instanceof Error ? cause : new Error('Audio load failed'),
          });
      });
    return () => {
      active = false;
    };
  }, [
    identity,
    enabled,
    userId,
    fableId,
    locale,
    source,
    capture,
    isCurrent,
    reload,
  ]);

  const recordCheckpoint = useCallback(
    (seconds: number, duration: number, completed = false) => {
      if (
        !enabled ||
        start.identity !== identity ||
        start.error ||
        !source ||
        !Number.isFinite(seconds) ||
        seconds < 0 ||
        !Number.isFinite(duration) ||
        duration <= 0
      )
        return;
      const session = capture();
      if (!session) return;
      const position = Math.min(seconds, duration);
      const previous = latest.current;
      if (
        !previous &&
        (position === 0 || position === start.position) &&
        !completed
      )
        return;
      if (
        previous?.identity === identity &&
        previous.data.positionSeconds === position &&
        previous.data.durationSeconds === duration &&
        previous.data.isCompleted === completed
      )
        return;
      latest.current = {
        session,
        identity,
        version: ++sequence.current,
        data: {
          fableId,
          locale,
          source,
          positionSeconds: position,
          durationSeconds: duration,
          isCompleted: completed,
          lastUpdated: Date.now(),
        },
      };
    },
    [
      enabled,
      start.identity,
      start.error,
      start.position,
      identity,
      source,
      capture,
      fableId,
      locale,
    ],
  );
  const record = useCallback(
    (seconds: number, duration: number) => recordCheckpoint(seconds, duration),
    [recordCheckpoint],
  );
  const commit = useCallback(
    (seconds: number, duration: number, completed = false) => {
      recordCheckpoint(seconds, duration, completed);
      flush();
    },
    [recordCheckpoint, flush],
  );

  useEffect(() => {
    if (!enabled) return;
    const interval = window.setInterval(flush, 15000);
    const hide = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', flush);
    window.addEventListener('fabledose:profile-changing', flush);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', flush);
      window.removeEventListener('fabledose:profile-changing', flush);
    };
  }, [enabled, flush]);
  const current = start.identity === identity;
  const currentStatus = status.identity === identity;
  return {
    ready: enabled && current && !start.error,
    initialPosition: current ? start.position : 0,
    record,
    commit,
    saving: currentStatus && status.writes > 0,
    readError: current ? start.error : null,
    saveError: currentStatus ? status.error : null,
    retryRead: () => setReload(value => value + 1),
    retrySave: flush,
  };
};
