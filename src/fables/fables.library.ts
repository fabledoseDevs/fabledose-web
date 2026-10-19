import { TAG_NAME } from '@/atoms/TagIcon/TagIcon.types';
import type { FableTileProps } from '@/molecules/FableTile/FableTile.types';
import type { StoryCardData } from '@/organisms/StoryCard/StoryCard.types';
import index from '@/public/fable-database/index.json';

import type { FableLocale, FableLocalized, FableMeta } from './fables.types';

/**
 * Normalizes interface locale names to the supported Polish or English variants.
 */
export const normalizeLocale = (lang: string): FableLocale =>
  lang === 'pl' ? 'pl' : 'en';

/**
 * Selects the requested translation, then English, Polish, and finally the supplied fallback.
 */
export const pickLocalized = (
  values: FableLocalized<string>,
  locale: FableLocale,
  fallback = '',
): string => values[locale] || values.en || values.pl || fallback;

/**
 * Resolves database-relative asset paths while preserving absolute URLs and data images.
 */
export const toFableDatabaseUrl = (value: string): string => {
  if (!value || /^(https?:\/\/|data:|\/)/.test(value)) return value;
  return value.startsWith('fable-database/')
    ? `/${value}`
    : `/fable-database/${value}`;
};

/**
 * Resolves all cover URLs, deriving missing cover paths from story or localized text pointers.
 */
export const resolveLibraryMeta = (meta: FableMeta): FableMeta => {
  const text = meta.contentPointers.text.en || meta.contentPointers.text.pl;
  const base =
    meta.contentPointers.story?.replace(/\/story\.json$/, '') ||
    text?.replace(/\/txt\/[^/]+\.json$/, '') ||
    `tales/${meta.slug.en || meta.slug.pl || meta.id}`;
  const cover = (value: string | undefined, file: string): string =>
    toFableDatabaseUrl(value || `${base}/img/${file}`);
  return {
    ...meta,
    covers: {
      tileCover: cover(meta.covers.tileCover, 'tileCover.jpg'),
      mainCover: cover(meta.covers.mainCover, 'cover_1920x1080.webm'),
      fullCover: cover(meta.covers.fullCover, 'fullCover.jpg'),
      audioCover: cover(meta.covers.audioCover, 'audioCover.jpg'),
    },
  };
};

/**
 * Shared library metadata bundled from the same index used by the server-side reader.
 * Cover URLs are resolved once and unknown tags are discarded.
 * Index changes require rebuilding the deployment.
 */
export const libraryFables: FableMeta[] = index.tales.map(({ meta }) =>
  resolveLibraryMeta({
    ...meta,
    tags: meta.tags.filter((tag): tag is TAG_NAME =>
      Object.values(TAG_NAME).includes(tag as TAG_NAME),
    ),
  }),
);

/**
 * Builds the localized introduction URL, using an available slug when its translation is missing.
 */
export const getFableUrl = (meta: FableMeta, locale: FableLocale): string =>
  `/${locale}/fable/${pickLocalized(meta.slug, locale, meta.id)}`;

/**
 * Maps shared metadata to a localized cover tile with a short description and introduction link.
 */
export const toFableTile = (
  meta: FableMeta,
  locale: FableLocale,
): FableTileProps => ({
  imageUrl: meta.covers.tileCover || meta.covers.fullCover || '',
  fableTitle: pickLocalized(meta.title, locale, meta.id),
  fableDescription: pickLocalized(meta.shortDescription, locale),
  fableUrl: getFableUrl(meta, locale),
});

/**
 * Maps shared metadata to a localized carousel card with warning tags and playback links.
 */
export const toStoryCardData = (
  meta: FableMeta,
  locale: FableLocale,
): StoryCardData => ({
  headline: pickLocalized(meta.title, locale, meta.id),
  description: pickLocalized(meta.shortDescription, locale),
  backgroundVideoUrl: meta.covers.mainCover || '',
  backgroundPosterUrl: meta.covers.fullCover || '',
  tags: meta.tags.map(name => ({
    name,
    warning: name === TAG_NAME.DEATH || name === TAG_NAME.TOXIC_RELATIONS,
  })),
  readUrl: `${getFableUrl(meta, locale)}?mode=slideshow`,
  audiobookUrl: `${getFableUrl(meta, locale)}?mode=audiobook`,
});
