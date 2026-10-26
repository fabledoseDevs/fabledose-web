'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  type ReadingProgressData,
  getReadingProgress,
  updateReadingProgress,
  waitForReadingProgressWrites,
} from '@/config/firestore';
import { useReadingProgressContext } from '@/contexts/ReadingProgressContext';

import { useAccountSession } from './useAccountSession';
import type { AccountSession } from './useAccountSession.types';
import type {
  FailedProgressSave,
  UseReadingProgressResult,
} from './useReadingProgress.types';

export const useReadingProgress = (
  userId: string | null,
): UseReadingProgressResult => {
  const { capture, isCurrent, revision } = useAccountSession(userId);
  const [errors, setErrors] = useState<{
    session: AccountSession | null;
    read: Error | null;
    save: Error | null;
  }>({ session: null, read: null, save: null });
  const [activity, setActivity] = useState<{
    session: AccountSession | null;
    reads: number;
    writes: number;
  }>({ session: null, reads: 0, writes: 0 });
  const pendingReads = useRef(
    new Map<string, Promise<ReadingProgressData | null>>(),
  );
  const versions = useRef(new Map<string, number>());
  const failed = useRef<FailedProgressSave | null>(null);
  const {
    getProgress: cachedProgress,
    setProgress,
    clearProgress,
  } = useReadingProgressContext();
  useEffect(() => {
    if (failed.current && !isCurrent(failed.current.session))
      failed.current = null;
  }, [userId, revision, isCurrent]);
  const setError = useCallback(
    (
      session: AccountSession,
      kind: 'read' | 'save',
      error: Error | null,
    ): void => {
      if (isCurrent(session))
        setErrors(previous => ({
          ...(isCurrent(previous.session)
            ? previous
            : { read: null, save: null }),
          session,
          [kind]: error,
        }));
    },
    [isCurrent],
  );
  const count = useCallback(
    (session: AccountSession, reads: number, writes: number): void => {
      if (isCurrent(session))
        setActivity(previous => {
          const current = isCurrent(previous.session)
            ? previous
            : { reads: 0, writes: 0 };
          return {
            session,
            reads: Math.max(0, current.reads + reads),
            writes: Math.max(0, current.writes + writes),
          };
        });
    },
    [isCurrent],
  );

  const saveProgress = useCallback(
    async (
      fableId: string,
      currentSlide: number,
      isCompleted = false,
    ): Promise<boolean> => {
      const session = capture();
      if (!session) return false;
      if (!Number.isInteger(currentSlide) || currentSlide < 0) {
        setError(session, 'save', new Error('Invalid reading position'));
        return false;
      }
      const writeKey = `${session.uid}/${session.epoch}/${fableId}`;
      const version = (versions.current.get(writeKey) || 0) + 1;
      versions.current.set(writeKey, version);
      const progress: ReadingProgressData = {
        fableId,
        currentSlide,
        isCompleted,
        lastUpdated: Date.now(),
      };
      setProgress(session.uid, fableId, progress);
      failed.current = null;
      setError(session, 'save', null);
      count(session, 0, 1);
      try {
        await updateReadingProgress(
          session.uid,
          fableId,
          currentSlide,
          isCompleted,
        );
        if (!isCurrent(session)) return false;
        if (versions.current.get(writeKey) === version) {
          failed.current = null;
          setError(session, 'save', null);
        }
        return true;
      } catch (cause: unknown) {
        if (cachedProgress(session.uid, fableId) === progress)
          clearProgress(session.uid, fableId);
        if (isCurrent(session) && versions.current.get(writeKey) === version) {
          failed.current = { session, fableId, currentSlide, isCompleted };
          setError(
            session,
            'save',
            cause instanceof Error
              ? cause
              : new Error('Failed to save progress'),
          );
        }
        return false;
      } finally {
        count(session, 0, -1);
      }
    },
    [
      capture,
      isCurrent,
      setProgress,
      cachedProgress,
      clearProgress,
      setError,
      count,
    ],
  );

  const getProgress = useCallback(
    async (fableId: string): Promise<ReadingProgressData | null> => {
      const session = capture();
      if (!session) return null;
      count(session, 1, 0);
      setError(session, 'read', null);
      try {
        await waitForReadingProgressWrites(session.uid, fableId);
        if (!isCurrent(session)) return null;
        const cached = cachedProgress(session.uid, fableId);
        if (cached) return cached;
        const key = `${session.uid}/${session.epoch}/${fableId}`;
        let request = pendingReads.current.get(key);
        if (!request) {
          request = getReadingProgress(session.uid, fableId);
          pendingReads.current.set(key, request);
          const pending = request;
          void pending
            .finally(() => {
              if (pendingReads.current.get(key) === pending)
                pendingReads.current.delete(key);
            })
            .catch(() => undefined);
        }
        const progress = await request;
        // A save may have started while the remote read was in flight.
        await waitForReadingProgressWrites(session.uid, fableId);
        if (!isCurrent(session)) return null;
        const newer = cachedProgress(session.uid, fableId);
        if (newer) return newer;
        if (progress) setProgress(session.uid, fableId, progress);
        setError(session, 'read', null);
        return progress;
      } catch (cause: unknown) {
        setError(
          session,
          'read',
          cause instanceof Error ? cause : new Error('Failed to load progress'),
        );
        return null;
      } finally {
        count(session, -1, 0);
      }
    },
    [capture, isCurrent, cachedProgress, setProgress, setError, count],
  );
  const retrySave = useCallback(async (): Promise<boolean> => {
    const previous = failed.current;
    return previous && isCurrent(previous.session)
      ? saveProgress(
          previous.fableId,
          previous.currentSlide,
          previous.isCompleted,
        )
      : false;
  }, [isCurrent, saveProgress]);
  const currentErrors = isCurrent(errors.session);
  return {
    saveProgress,
    getProgress,
    retrySave,
    canRetrySave: Boolean(failed.current && isCurrent(failed.current.session)),
    loading: isCurrent(activity.session) && activity.reads > 0,
    saving: isCurrent(activity.session) && activity.writes > 0,
    error: currentErrors ? errors.save || errors.read : null,
    readError: currentErrors ? errors.read : null,
    saveError: currentErrors ? errors.save : null,
  };
};
