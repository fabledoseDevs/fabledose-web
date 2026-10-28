'use client';
import type { ReactElement } from 'react';

import { libraryFables } from '@/fables/fables.library';
import { useChildAccess } from '@/hooks/useChildAccess';
import { useDictionary } from '@/lang/DictionaryProvider';

/** Informational schedule notice; catalogue visibility still follows story exclusions. */
export const ProfileAccessNotice = (): ReactElement | null => {
  const { outsideHours, isChild, loading, canDiscover } = useChildAccess();
  const text = useDictionary().childProfiles;
  const empty = isChild && !libraryFables.some(item => canDiscover(item.id));
  return outsideHours || empty || loading ? (
    <p
      role="status"
      style={{ color: 'white', padding: '20px 24px', textAlign: 'center' }}
    >
      {loading
        ? text.loading
        : outsideHours
        ? text.blockedHours
        : text.noAvailableStories}
    </p>
  ) : null;
};
