import { useCallback, useEffect, useState } from 'react';

import { useSettings } from '@/contexts/SettingsContext';

import type { UseStoryCard as UseStoryCardType } from './StoryCard.types';

const useStoryCard: UseStoryCardType = ({ unlockedAccount }) => {
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const { settings, refreshPlanFromFirebase } = useSettings();

  const handleVideoCanPlay = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  useEffect(() => {
    void refreshPlanFromFirebase();
  }, [refreshPlanFromFirebase]);

  const isUnlockedFromSettings =
    settings?.plan === 'family' || settings?.plan === 'ultimate';
  const isUnlockedAccount = Boolean(unlockedAccount) || isUnlockedFromSettings;

  return { isVideoReady, isUnlockedAccount, handleVideoCanPlay };
};

export default useStoryCard;
