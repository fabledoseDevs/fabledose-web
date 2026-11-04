import type { ReactElement } from 'react';

import type { ArticleData } from '@/articles/articles.types';

/**
 * Localized public help-centre copy, shared with its entry points in the app.
 * @remarks Article titles come from the same localized content loader as the
 * article pages; only headings and FAQ answers belong in this dictionary.
 */
export interface HelpCenterText {
  title: string;
  intro: string;
  home: string;
  open: string;
  faqTitle: string;
  articlesTitle: string;
  guides: string;
  project: string;
  legal: string;
  other: string;
  contactTitle: string;
  contactDescription: string;
  contactButton: string;
  /** Expandable answers describing current features, not unimplemented promises. */
  faq: { question: string; answer: string }[];
}

/**
 * Public help-centre input resolved by the server for the requested locale.
 * @remarks Supply the normalized article collection, including localized titles.
 * The view groups known slugs, lists future articles separately and excludes the
 * internal example article. It does not require an account or plan entitlement.
 * @example
 * ```tsx
 * <HelpCenter articles={await getAllArticles('pl')} />
 * ```
 */
export interface HelpCenterProps {
  /** Localized public article catalogue; no private user information. */
  articles: ArticleData[];
}

/**
 * Public FAQ, grouped article directory and support contact entry point.
 * @remarks Uses the shared Accordion, Container, Headline, Paragraph, ArticleLink
 * and Button components. Theme typography and standard Container gaps/padding
 * define the layout; no separate help-specific typography or disclosure styles.
 * FAQ answers grow to their content; article links retain the current language.
 * @group Component
 */
export type HelpCenter = (props: HelpCenterProps) => ReactElement;
