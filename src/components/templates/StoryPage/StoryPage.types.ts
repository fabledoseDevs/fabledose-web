import type { ReactElement } from 'react';

import type { FableData, FableLocale } from '@/fables/fables.types';

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
 */
export interface StoryPageProps {
  fable: FableData;
  mode: StoryPageMode;
  lang: FableLocale;
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
