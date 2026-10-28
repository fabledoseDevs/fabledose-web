'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useRef, useState } from 'react';

import { auth } from '@/config/firebase';

import type {
  AccountSession,
  AccountSessionGuard,
} from './useAccountSession.types';

export const useAccountSession = (
  userId: string | null,
  profileId: string | null = null,
): AccountSessionGuard => {
  const session = useRef({ uid: auth.currentUser?.uid ?? null, epoch: 0 });
  const scope = useRef({ profileId, epoch: 0 });
  if (scope.current.profileId !== profileId)
    scope.current = { profileId, epoch: scope.current.epoch + 1 };
  const scopeEpoch = scope.current.epoch;
  const mounted = useRef(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    mounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, user => {
      const uid = user?.uid ?? null;
      if (session.current.uid !== uid) {
        session.current = { uid, epoch: session.current.epoch + 1 };
        setRevision(value => value + 1);
      }
    });
    return () => {
      mounted.current = false;
      session.current.epoch += 1;
      unsubscribe();
    };
  }, []);
  const capture = useCallback(
    (): AccountSession | null =>
      mounted.current &&
      userId &&
      auth.currentUser?.uid === userId &&
      session.current.uid === userId &&
      scope.current.profileId === profileId &&
      scope.current.epoch === scopeEpoch
        ? { uid: userId, epoch: session.current.epoch, profileId, scopeEpoch }
        : null,
    [userId, profileId, scopeEpoch],
  );
  const isCurrent = useCallback(
    (token: AccountSession | null): boolean =>
      Boolean(
        mounted.current &&
          token &&
          token.uid === auth.currentUser?.uid &&
          token.uid === session.current.uid &&
          token.epoch === session.current.epoch &&
          token.profileId === scope.current.profileId &&
          token.scopeEpoch === scope.current.epoch,
      ),
    [],
  );
  return { capture, isCurrent, revision: revision + scopeEpoch };
};
