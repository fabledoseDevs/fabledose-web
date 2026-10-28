'use client';
import { useCallback, useEffect, useState } from 'react';

import { childAccessReason, defaultChildPolicy } from '@/config/childPolicy';
import { useChildProfiles } from '@/contexts/ChildProfilesContext';

import type { ChildAccessResult } from './useChildAccess.types';

const unrestricted = defaultChildPolicy();
export const useChildAccess = (): ChildAccessResult => {
  const { profiles, activeProfileId, loading } = useChildProfiles();
  const profile = profiles.find(item => item.id === activeProfileId);
  const policy = profile?.policy || unrestricted;
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    if (!activeProfileId || !policy.scheduleEnabled) return;
    const timer = window.setInterval(update, 1000);
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, [activeProfileId, policy.scheduleEnabled, policy.timeZone]);
  const canDiscover = useCallback(
    (id: string) =>
      !loading && (!activeProfileId || !policy.excludedStories.includes(id)),
    [loading, activeProfileId, policy],
  );
  const reason = useCallback(
    (id: string) =>
      loading
        ? 'loading'
        : activeProfileId
        ? childAccessReason(policy, id, now)
        : null,
    [loading, activeProfileId, policy, now],
  );
  return {
    loading,
    isChild: Boolean(activeProfileId),
    canDiscover,
    reason,
    outsideHours: Boolean(
      activeProfileId && childAccessReason(policy, '', now) === 'hours',
    ),
  };
};
