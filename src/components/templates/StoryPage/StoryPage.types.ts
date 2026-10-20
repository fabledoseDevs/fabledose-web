import type { ReactElement } from 'react';

import type { FableData, FableLocale } from '@/fables/fables.types';
import type { StoryCardProps } from '@/organisms/StoryCard/StoryCard.types';

/**
 * @module
 * Types and interfaces for the StoryPage template component.
 */

/**
 * Supported story view modes controlled by query params.
 */
export type StoryPageMode = 'intro' | 'slideshow' | 'audiobook';

/**
 * Interface for StoryPage template props.
 *
 * @property fable - Fully resolved fable payload for the selected route.
 * @property mode - Active story mode resolved from query params.
 * @property lang - Current route locale used for navigation and labels.
 * @property initialSlide - Optional initial slide index for slideshow mode.
 */
export interface StoryPageProps {
  fable: FableData;
  mode: StoryPageMode;
  lang: FableLocale;
  initialSlide?: number;
}

/**
 * StoryPage template component type.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <StoryPage fable={fable} mode="slideshow" lang="en" />
 * ```
 */
export type StoryPage = (props: StoryPageProps) => ReactElement;

/**
 * Introduction card with account-scoped continuation and persistent reset.
 *
 * @property fableId - Stable catalogue ID used to read and reset progress.
 * @property data - Localized card content; the reader URL receives saved slide parameters.
 * @property variant - Story card layout inherited from the base card.
 * @property unlockedAccount - Whether premium actions are available.
 */
export interface StoryCardWithProgressProps extends StoryCardProps {
  fableId: string;
}
