'use client';

import Sidebar from '@/organisms/Sidebar';

import { ArticlePage } from './ArticlePage';
import type {
  ArticlePageView as ArticlePageViewType,
  ArticlePageViewProps,
} from './ArticlePage.types';

export const ArticlePageView: ArticlePageViewType = ({
  article,
}: ArticlePageViewProps) => (
  <>
    <Sidebar />
    <ArticlePage article={article} />
  </>
);
