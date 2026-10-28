'use client';
import type { ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { auth } from '@/config/firebase';
import { useChildProfiles } from '@/contexts/ChildProfilesContext';
import { useReaderStart } from '@/hooks/useReaderStart';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useDictionary } from '@/lang/DictionaryProvider';
import { SyncStatus } from '@/molecules/SyncStatus/SyncStatus';
import StoryCard from '@/organisms/StoryCard';

import { StoryPageCenteredContent } from './StoryPage.styled';
import type { StoryCardWithProgressProps } from './StoryPage.types';

export const StoryCardWithProgress = ({
  variant,
  unlockedAccount,
  data,
  fableId,
}: StoryCardWithProgressProps): ReactElement => {
  const {
    activeProfileId,
    loading: profilesLoading,
    revision: profileRevision,
  } = useChildProfiles();
  const [account, setAccount] = useState<{
    uid: string | null;
    checked: boolean;
    revision: number;
  }>({ uid: null, checked: false, revision: 0 });
  const { getProgress, saveProgress, saving, readError, saveError, retrySave } =
    useReadingProgress(profilesLoading ? null : account.uid, activeProfileId);
  const { storyCard, librarySync: text } = useDictionary();
  const reader = useReaderStart({
    userId: account.uid,
    authChecked: account.checked && !profilesLoading,
    accountRevision: account.revision + profileRevision,
    fableId,
    enabled: true,
    getProgress,
  });
  useEffect(
    () =>
      auth.onAuthStateChanged(user => {
        const uid = user?.uid ?? null;
        setAccount(previous =>
          previous.checked && previous.uid === uid
            ? previous
            : { uid, checked: true, revision: previous.revision + 1 },
        );
      }),
    [],
  );
  const handleResetProgress = useCallback(async () => {
    if (await saveProgress(fableId, 0, false)) reader.retry();
  }, [saveProgress, fableId, reader.retry]);
  if (!reader.ready || saving || readError || saveError)
    return (
      <StoryPageCenteredContent>
        <SyncStatus
          message={
            saveError
              ? text.progressFailed
              : readError
              ? text.progressLoadFailed
              : saving
              ? text.savingProgress
              : text.loadingProgress
          }
          isError={Boolean(readError || saveError)}
          onRetry={
            saveError
              ? () => {
                  void retrySave().then(saved => {
                    if (saved) reader.retry();
                  });
                }
              : readError
              ? reader.retry
              : undefined
          }
          retryLabel={saveError ? text.retrySave : text.refresh}
        />
      </StoryPageCenteredContent>
    );
  const hasProgress = reader.slide > 0;
  return (
    <StoryCard
      variant={variant}
      unlockedAccount={unlockedAccount}
      onResetProgress={hasProgress ? handleResetProgress : undefined}
      data={{
        ...data,
        readUrl: hasProgress
          ? `${data.readUrl}${data.readUrl?.includes('?') ? '&' : '?'}slide=${
              reader.slide
            }`
          : data.readUrl,
        readButtonText: hasProgress
          ? storyCard.readButtonContinue
          : data.readButtonText,
      }}
    />
  );
};
