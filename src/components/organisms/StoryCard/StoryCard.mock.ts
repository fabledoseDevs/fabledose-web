import {
  FOREGROUND_COLOR as HEADLINE_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import { TAG_NAME } from '@/atoms/TagIcon/TagIcon.types';

import type { StoryCardData } from './StoryCard.types';

/**
 * Mock content for StoryCard. Replace with real data once backend is connected.
 */
export const StoryMock: StoryCardData = {
  backgroundVideoUrl: '/mockImages/animCover-fisherman.webm',
  backgroundPosterUrl: undefined,
  headline: 'O rybaku i złotej rybce',
  headlineType: HEADLINE_TYPE.JUMBO,
  headlineColor: HEADLINE_COLOR.WHITE,
  description:
    'Życie skromnego rybaka oraz jego żony zmienia się na lepsze, gdy w jego sieć zaplątuje się złota rybka. Jednak pragnienia wymykają się spod kontroli, a ich codzienność zaczyna przepełniać chaos. Czy rybak i jego żona odnajdą w sobie umiar i powstrzymają wiszącą nad nimi groźbę?',
  tags: [
    { name: TAG_NAME.AGE_5, warning: false },
    { name: TAG_NAME.CLASSIC_FABLE, warning: false },
    { name: TAG_NAME.MODERATION, warning: false },
    { name: TAG_NAME.CAREFULNESS, warning: false },
    { name: TAG_NAME.DEATH, warning: true },
  ],
};

export default StoryMock;
