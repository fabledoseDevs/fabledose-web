import { useCallback, useState } from 'react';

import type { UseStoryCard as UseStoryCardType } from './StoryCard.types';

const useStoryCard: UseStoryCardType = () => {
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  const handleVideoCanPlay = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  return { isVideoReady, handleVideoCanPlay };
};

export default useStoryCard;
