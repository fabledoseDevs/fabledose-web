import type { TAG_NAME } from '@/components/atoms/TagIcon/TagIcon.types';

/**
 * Supported locales for fable data.
 */
export type FableLocale = 'pl' | 'en';

/**
 * Locale-keyed map used across metadata and content pointers.
 */
export type FableLocalized<T> = Partial<Record<FableLocale, T>>;

/**
 * Describes the long metadata text for one locale.
 */
export interface FableFullDescription {
  synopsis: string;
  comment: string;
}

/**
 * Credits grouped by role.
 */
export interface FableCredits {
  authors: string[];
  illustrators: string[];
  animators: string[];
  lectors: string[];
  translators: string[];
}

/**
 * Cover-image set used by different UI contexts.
 */
export interface FableCovers {
  tileCover: string;
  mainCover: string;
  fullCover: string;
  audioCover: string;
}

/**
 * Pointers to external content files.
 */
export interface FableContentPointers {
  text: FableLocalized<string>;
  audio?: FableLocalized<string>;
}

/**
 * All metadata stored for a single fairy tale.
 */
export interface FableMeta {
  id: string;
  slug: FableLocalized<string>;
  title: FableLocalized<string>;
  shortDescription: FableLocalized<string>;
  fullDescription: FableLocalized<FableFullDescription>;
  credits: FableCredits;
  tags: TAG_NAME[];
  covers: FableCovers;
  contentPointers: FableContentPointers;
}

/**
 * Single text slide definition.
 */
export interface FableTextSlide {
  paragraphs: string[];
  backgroundImage: Record<string, string>;
  audioFile?: string;
  layout?: string;
}

/**
 * Text content payload loaded from txt/<lang>.json.
 */
export interface FableTextContent {
  slides: FableTextSlide[];
}

/**
 * Audio payload resolved for a selected locale.
 */
export interface FableAudioContent {
  selected?: string;
  files: FableLocalized<string>;
}

/**
 * Fable content grouped by domain.
 */
export interface FableContent {
  locale: FableLocale;
  text: FableTextContent;
  audio: FableAudioContent;
}

/**
 * Canonical fable payload used by app routes.
 */
export interface FableData {
  meta: FableMeta;
  content: FableContent;
}

/**
 * Item stored in public/fable-database/index.json.
 */
export interface FableIndexItem {
  meta: FableMeta;
}

/**
 * Root shape stored in public/fable-database/index.json.
 */
export interface FableDatabaseIndex {
  tales: FableIndexItem[];
}
