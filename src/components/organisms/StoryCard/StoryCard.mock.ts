import {
  FOREGROUND_COLOR as HEADLINE_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import { TAG_NAME } from '@/atoms/TagIcon/TagIcon.types';

import type { StoryCardData } from './StoryCard.types';

/**
 * Mock content for StoryCard. Replace it with real data once the backend is connected.
 */

export const StoryOneMock: StoryCardData = {
  backgroundVideoUrl: '/mockImages/animCover-goldilock.webm',
  backgroundPosterUrl: undefined,
  headline: 'Złotowłosa',
  headlineType: HEADLINE_TYPE.JUMBO,
  headlineColor: HEADLINE_COLOR.WHITE,
  description:
    'Złotowłosa dziewczynka natrafia na chatkę niedźwiadków i zaczyna tam psocić, w konsekwencji czego otrzymuje lekcję na temat znaczenia odpowiedzialności.',
  tags: [
    { name: TAG_NAME.AGE_3, warning: false },
    { name: TAG_NAME.CLASSIC_FABLE, warning: false },
    { name: TAG_NAME.RESPONSIBILITY, warning: false },
    { name: TAG_NAME.PRIVACY, warning: false },
    { name: TAG_NAME.REPARATION, warning: false },
  ],
};

export const StoryTwoMock: StoryCardData = {
  backgroundVideoUrl: '/mockImages/animCover-three-pigs.webm',
  backgroundPosterUrl: undefined,
  headline: 'Trzy małe świnki',
  headlineType: HEADLINE_TYPE.JUMBO,
  headlineColor: HEADLINE_COLOR.WHITE,
  description:
    'Trzy świnki wyruszają w wielki świat aby rozpocząć samodzielne życie. Ich historia nabiera dramatycznych barw, gdy muszą się skonfrontować z wilkiem.',
  tags: [
    { name: TAG_NAME.AGE_3, warning: false },
    { name: TAG_NAME.CLASSIC_FABLE, warning: false },
    { name: TAG_NAME.SUBSIDIARITY, warning: false },
    { name: TAG_NAME.RESPONSIBILITY, warning: false },
    { name: TAG_NAME.DILIGENCE, warning: false },
  ],
};

export const StoryThreeMock: StoryCardData = {
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
    { name: TAG_NAME.RESPONSIBILITY, warning: false },
  ],
};
