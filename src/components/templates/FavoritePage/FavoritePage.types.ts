import type { ReactElement } from 'react';

import type { FavoriteData, ReadingProgressData } from '@/config/firestore';
import type { FableLocale, FableMeta } from '@/fables/fables.types';

/**
 * @module
 * This file defines the types and interfaces for the FavoritePage component.
 */

/**
 * Component renders the favorite page with user's favorite stories and continue reading list.
 *
 * The page displays:
 * - A carousel of stories the user has marked as favorites
 * - A carousel of stories the user has started but not completed
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <FavoritePage />
 * ```
 */
export type FavoritePage = () => ReactElement;

/**
 * Indexed fable enriched with a navigation link and optional reading progress.
 *
 * @property meta - Shared metadata with resolved cover URLs.
 * @property url - Localized introduction or continuation link.
 * @property currentSlide - Saved zero-based slide index, when resuming reading.
 * @property totalSlides - Slide count loaded from story content, when available.
 */
export interface FableWithMeta {
  meta: FableMeta;
  url: string;
  currentSlide?: number;
  totalSlides?: number;
}

/**
 * Inputs used to resolve saved user records against the shared fable index.
 *
 * @property favorites - Favorite records identified by stable fable IDs.
 * @property continueReading - Unfinished reading progress records.
 * @property loading - Whether user records are still being fetched.
 * @property currentLang - Locale used for navigation links and metadata.
 */
export interface UseFavoritesDataProps {
  favorites: FavoriteData[];
  continueReading: ReadingProgressData[];
  loading: boolean;
  currentLang: FableLocale;
}

/**
 * Resolved favorite and continuation entries for the current user and locale.
 *
 * @property favoriteFables - Indexed favorites; missing catalogue records are omitted.
 * @property continueReadingFables - Indexed entries with saved slides and continuation links.
 * @property loadingFables - Whether metadata and slide counts are being resolved.
 */
export interface UseFavoritesDataReturnValues {
  favoriteFables: FableWithMeta[];
  continueReadingFables: FableWithMeta[];
  loadingFables: boolean;
}
