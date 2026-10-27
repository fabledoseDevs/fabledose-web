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
 * Parent-facing commentary and a complete plot synopsis for one locale.
 *
 * @remarks
 * The details modal displays commentary before the synopsis and explicitly warns
 * that the synopsis reveals the ending. Separate paragraphs with blank lines.
 * Describe this adaptation, including frightening scenes and how they resolve;
 * do not substitute a generic synopsis of a different version of the tale.
 *
 * @example
 * ```ts
 * const description: FableFullDescription = {
 *   comment: 'The wolf threatens the pigs but does not die.',
 *   synopsis: 'The brothers build three houses.\n\nThey escape to the stone house and the wolf flees.',
 * };
 * ```
 */
export interface FableFullDescription {
  /** Complete plot, including resolution and ending, shown after the spoiler disclosure. */
  synopsis: string;
  /** Parent-facing themes and concrete content guidance specific to this adaptation. */
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
 * Cover-image set used by the catalogue, search results and story views.
 *
 * @remarks
 * Tile consumers choose tileCovers for the page locale before falling back to
 * the legacy tileCover and fullCover. Other cover roles keep their own images.
 * Locale-specific covers must not silently fall back to the other language.
 *
 * @example
 * ```ts
 * const covers: FableCovers = {
 *   tileCovers: { pl: 'tales/goldilocks/img/tileCoverPL.jpg', en: 'tales/goldilocks/img/tileCoverEN.jpg' },
 *   tileCover: 'tales/goldilocks/img/tileCover.jpg',
 * };
 * ```
 */
export interface FableCovers {
  /** Tile covers keyed by page locale; paths may be database-relative or absolute URLs. */
  tileCovers?: FableLocalized<string>;
  /** Legacy, language-neutral tile cover used when a localized entry is absent. */
  tileCover?: string;
  /** Animated background for story introductions. */
  mainCover?: string;
  /** Full-size static image and final tile-image fallback. */
  fullCover?: string;
  /** Dedicated audiobook cover, preferred over tile covers by the player. */
  audioCover?: string;
}

/**
 * Pointers to external content files.
 */
export interface FableContentPointers {
  story?: string;
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
}

/**
 * Slide metadata shared across all locales.
 */
export interface FableStorySlide {
  scene?: string;
  layout?: string;
  audioFile?: string;
}

/**
 * Shared story payload loaded from story.json.
 */
export interface FableStoryContent {
  slides: FableStorySlide[];
}

/**
 * Fully resolved slide payload used by rendering.
 */
export interface FableResolvedSlide {
  paragraphs: string[];
  backgroundImage: Record<string, string>;
  audioFile?: string;
  layout: string;
}

/**
 * Text content payload loaded from txt/<lang>.json.
 */
export interface FableTextContent {
  slides: FableResolvedSlide[];
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
