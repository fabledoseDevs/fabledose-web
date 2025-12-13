import type { ReactElement } from 'react';

import type { TAG_NAME } from '@/atoms/TagIcon/TagIcon.types';

import type {
  FOREGROUND_COLOR as HEADLINE_COLOR,
  HEADLINE_TYPE,
} from '../../atoms/Headline/Headline.types';

/**
 * @file
 * This file defines the types and interfaces for StoryCard component.
 *
 * The StoryCard displays a wide, media-rich banner that summarizes a fable/story
 * and encourages the user to read it. It supports two size variants and renders
 * story metadata, CTA buttons, and tag icons on top of an animated video background.
 *
 * Example usage (with mock data from StoryCard.mock.ts):
 * ```tsx
 * import { StoryCard } from './StoryCard';
 * import { StoryMock } from './StoryCard.mock';
 *
 * <StoryCard
 *   variant={STORY_CARD_VARIANT.COMPACT}
 *   unlockedAccount={true}
 *   data={StoryMock}
 * />
 * ```
 */

/**
 * Two available layout variants for the StoryCard.
 * - COMPACT: max width 1800px, height 800px, rounded corners
 * - FULLSCREEN: fills 100vw by 100vh
 */
export enum STORY_CARD_VARIANT {
  COMPACT = 'compact',
  FULLSCREEN = 'fullscreen',
}

/**
 * Data model for the StoryCard content.
 *
 * @property backgroundVideoUrl - Path/URL to the background WEBM video; should autoplay, loop, muted.
 * @property backgroundPosterUrl - Path/URL to a static blurred image shown before the video loads.
 * @property headline - HTML string for the main headline (rendered by Headline, variant WHITE recommended).
 * @property headlineType - Optional Headline weight; defaults to HEADLINE_TYPE.JUMBO.
 * @property headlineColor - Optional Headline color; defaults to WHITE.
 * @property description - Main supporting paragraph text.
 * @property tags - Up to five TagIcon identifiers describing the story.
 */
export interface StoryCardData {
  backgroundVideoUrl: string;
  backgroundPosterUrl?: string;
  headline: string;
  headlineType?: HEADLINE_TYPE;
  headlineColor?: HEADLINE_COLOR;
  description: string;
  tags: TAG_NAME[];
}

/**
 * Interface for StoryCard component props.
 *
 * @property variant - Layout variant controlling size and radius.
 * @property unlockedAccount - Controls which CTAs/rows are rendered.
 * @property data - Content object with media, headline, description and tags.
 */
export interface StoryCardProps {
  variant: STORY_CARD_VARIANT;
  unlockedAccount: boolean;
  data: StoryCardData;
}

export interface UseStoryCardReturnValues {
  isVideoReady: boolean;
  handleVideoCanPlay: () => void;
}

export type UseStoryCard = () => UseStoryCardReturnValues;

/**
 * @group Components
 */
export type StoryCard = (props: StoryCardProps) => ReactElement;
