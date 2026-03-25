/**
 * @module
 * This file defines the shared types used by article content files
 * and article loading logic.
 */

/**
 * Single content section rendered inside an article body.
 *
 * @property title - Optional section heading displayed above content.
 * @property paragraphs - Optional paragraph content. Can be a single paragraph
 * string or a list of paragraphs.
 * @property list - Optional unordered list content rendered as bullet points.
 */
export interface ArticleSection {
  title?: string;
  paragraphs?: string | string[];
  list?: string[];
}

/**
 * Supported locales for localized article payloads.
 */
export type ArticleLocale = 'pl' | 'en';

/**
 * Localized article content for one language variant.
 *
 * @property title - Localized article title.
 * @property sections - Ordered content sections for the localized variant.
 */
export interface ArticleTranslation {
  title: string;
  sections: ArticleSection[];
}

/**
 * Canonical article representation used in source content files.
 *
 * @property url - Locale-agnostic slug used by route matching.
 * @property translations - Map of localized article payloads keyed by locale.
 */
export interface ArticleLocalizedData {
  url: string;
  translations: Partial<Record<ArticleLocale, ArticleTranslation>>;
}

/**
 * Resolved article payload used by UI templates after locale selection.
 *
 * @property title - Final article title selected for current locale/fallback.
 * @property url - Article slug used by the dynamic route.
 * @property sections - Final section list selected for current locale/fallback.
 */
export interface ArticleData {
  title: string;
  url: string;
  sections: ArticleSection[];
}
