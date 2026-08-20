'use client';

import { useCallback, useEffect, useState } from 'react';

import StoryCard from '@/organisms/StoryCard';
import { STORY_CARD_VARIANT } from '@/organisms/StoryCard/StoryCard.types';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useReadingProgressContext } from '@/contexts/ReadingProgressContext';
import { useDictionary } from '@/lang/DictionaryProvider';
import { auth } from '@/config/firebase';

interface StoryCardWithProgressProps {
  variant: typeof STORY_CARD_VARIANT.FULLSCREEN;
  unlockedAccount: boolean;
  data: {
    backgroundVideoUrl: string;
    backgroundPosterUrl: string;
    headline: string;
    description: string;
    tags: Array<{ name: any; warning: boolean }>;
    readUrl: string;
    audiobookUrl: string;
    pdfUrl?: string;
    epubUrl?: string;
    moreInfoUrl?: string;
  };
  fableId: string;
}

export const StoryCardWithProgress = ({
  variant,
  unlockedAccount,
  data,
  fableId,
}: StoryCardWithProgressProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [readUrl, setReadUrl] = useState(data.readUrl);
  const [audiobookUrl, setAudiobookUrl] = useState(data.audiobookUrl);
  const [readButtonText, setReadButtonText] = useState<string | undefined>();
  const [hasProgress, setHasProgress] = useState(false);
  const { getProgress } = useReadingProgress(userId);
  const { clearProgress } = useReadingProgressContext();
  const { storyCard } = useDictionary();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserId(user?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  const handleResetProgress = useCallback(() => {
    clearProgress(fableId);
    setHasProgress(false);
    setReadUrl(data.readUrl);
    setAudiobookUrl(data.audiobookUrl);
    setReadButtonText(undefined);
  }, [fableId, clearProgress, data.readUrl, data.audiobookUrl]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId) return;

      const progress = await getProgress(fableId);
      if (progress && progress.currentSlide > 0) {
        const slideParam = `&slide=${progress.currentSlide}`;
        setReadUrl(data.readUrl + slideParam);
        setAudiobookUrl(data.audiobookUrl + slideParam);
        setReadButtonText((storyCard as any).readButtonContinue || 'Czytaj dalej');
        setHasProgress(true);
      }
    };

    void fetchProgress();
  }, [userId, fableId, getProgress, data.readUrl, data.audiobookUrl, storyCard]);

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
