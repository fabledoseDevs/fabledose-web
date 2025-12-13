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
    TAG_NAME.CLASSIC_FABLE,
    TAG_NAME.RESPONSIBILITY,
    TAG_NAME.COOPERATION,
    TAG_NAME.MODERATION,
    TAG_NAME.FAMILY,
  ],
};

export default StoryMock;
