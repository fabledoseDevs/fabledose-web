import type { ReactElement } from 'react';

import type { FableTileProps } from '@/molecules/FableTile/FableTile.types';
import type { StoryCardData } from '@/organisms/StoryCard/StoryCard.types';

/**
 * @module
 * This file defines the types and interfaces for the UserDesktop template component.
 */

/**
 * Component renders the main User Desktop view.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <UserDesktop />
 * ```
 */
export type UserDesktop = () => ReactElement;

/**
 * Localized library data and carousel controls returned by the UserDesktop hook.
 *
 * @property viewportRef - Ref callback attached to the Embla viewport element to initialize the carousel.
 * @property selectedIndex - Index of the currently selected slide.
 * @property slideCount - Number of slides available.
 * @property scrollTo - Programmatically scrolls to the provided slide index.
 * @property storyCards - All indexed fables mapped to localized carousel cards, including reader and audiobook links.
 * @property tiles - The same indexed fables mapped to localized library tiles.
 */
export interface UseUserDesktopReturnValues {
  viewportRef: (node: HTMLElement | null) => void;
  selectedIndex: number;
  slideCount: number;
  scrollTo: (index: number) => void;
  storyCards: StoryCardData[];
  tiles: FableTileProps[];
}

/**
 * Builds cards and tiles from the shared fable index and controls Embla pagination.
 *
 * @param lang - Requested interface locale; unsupported values use English.
 * @returns Localized library data and carousel controls.
 */
export type UseUserDesktop = (lang: string) => UseUserDesktopReturnValues;
