import { useCallback, useEffect, useState } from 'react';

import { useSettings } from '@/contexts/SettingsContext';

import type { UseStoryCard as UseStoryCardType } from './StoryCard.types';

const useStoryCard: UseStoryCardType = () => {
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const { refreshPlanFromFirebase } = useSettings();

  const handleVideoCanPlay = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  useEffect(() => {
    void refreshPlanFromFirebase();
  }, [refreshPlanFromFirebase]);

  return { isVideoReady, handleVideoCanPlay };
};

export default useStoryCard;
