'use client';

import type { ReactElement } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { auth } from '@/config/firebase';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useDictionary } from '@/lang/DictionaryProvider';
import StoryCard from '@/organisms/StoryCard';

import type { StoryCardWithProgressProps } from './StoryPage.types';

export const StoryCardWithProgress = ({
  variant,
  unlockedAccount,
  data,
  fableId,
}: StoryCardWithProgressProps): ReactElement => {
  const [userId, setUserId] = useState<string | null>(null);
  const [readUrl, setReadUrl] = useState(data.readUrl);
  const [audiobookUrl, setAudiobookUrl] = useState(data.audiobookUrl);
  const [readButtonText, setReadButtonText] = useState<string | undefined>();
  const [hasProgress, setHasProgress] = useState(false);
  const { getProgress, saveProgress } = useReadingProgress(userId);
  const { storyCard } = useDictionary();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserId(user?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  const handleResetProgress = useCallback(async () => {
    if (
      !(await saveProgress(fableId, 0, false)) ||
      auth.currentUser?.uid !== userId
    )
      return;
    setHasProgress(false);
    setReadUrl(data.readUrl);
    setAudiobookUrl(data.audiobookUrl);
    setReadButtonText(undefined);
  }, [userId, fableId, saveProgress, data.readUrl, data.audiobookUrl]);

  useEffect(() => {
    let active = true;
    setHasProgress(false);
    setReadUrl(data.readUrl);
    setAudiobookUrl(data.audiobookUrl);
    setReadButtonText(undefined);
    const fetchProgress = async () => {
      if (!userId) return;

      const progress = await getProgress(fableId);
      if (
        active &&
        progress &&
        !progress.isCompleted &&
        progress.currentSlide > 0
      ) {
        const slideParam = `&slide=${progress.currentSlide}`;
        setReadUrl(data.readUrl + slideParam);
        setAudiobookUrl(data.audiobookUrl + slideParam);
        setReadButtonText(storyCard.readButtonContinue);
        setHasProgress(true);
      }
    };

    void fetchProgress();
    return () => {
      active = false;
    };
  }, [
    userId,
    fableId,
    getProgress,
    data.readUrl,
    data.audiobookUrl,
    storyCard,
  ]);

  return (
    <StoryCard
      variant={variant}
      unlockedAccount={unlockedAccount}
      onResetProgress={hasProgress ? handleResetProgress : undefined}
      data={{
        ...data,
        readUrl,
        audiobookUrl,
        readButtonText,
      }}
    />
  );
};
