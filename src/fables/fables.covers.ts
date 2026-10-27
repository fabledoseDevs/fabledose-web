import type { FableCovers, FableLocale } from './fables.types';

/**
 * Selects a tile cover in the page language, then a language-neutral legacy cover.
 * Other language variants are never substituted; callers resolve database-relative URLs.
 */
export const getTileCover = (
  covers: FableCovers,
  locale: FableLocale,
): string =>
  covers.tileCovers?.[locale] || covers.tileCover || covers.fullCover || '';
