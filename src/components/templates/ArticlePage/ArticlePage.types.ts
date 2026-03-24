import type { ReactElement } from 'react';

import type { ArticleData } from '@/articles/articles.types';

/**
 * @module
 * This file defines the types and interfaces for the ArticlePage template component.
 */

/**
 * Interface for ArticlePage component props.
 *
 * @property article - Fully resolved article payload used to render the page
 * sections, including title, URL identifier, and content blocks.
 */
export interface ArticlePageProps {
  article: ArticleData;
}

/**
 * Interface for ArticlePageView component props.
 *
 * @property article - Fully resolved article payload passed from the route
 * server component into the client view wrapper.
 */
export interface ArticlePageViewProps {
  article: ArticleData;
}

/**
 * Component renders an article view based on provided article data.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <ArticlePage article={articleData} />
 * ```
 */
export type ArticlePage = (props: ArticlePageProps) => ReactElement;

/**
 * Component renders the client-side article page shell with Sidebar and
 * ArticlePage content.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <ArticlePageView article={articleData} />
 * ```
 */
export type ArticlePageView = (props: ArticlePageViewProps) => ReactElement;
