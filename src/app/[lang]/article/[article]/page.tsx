import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { getArticleBySlug } from '@/articles/articles.data';
import { ArticlePageView } from '@/components/templates/ArticlePage/ArticlePageView';

interface ArticleRouteParams {
  lang: string;
  article: string;
}

const Article = async ({
  params,
}: {
  params: Promise<ArticleRouteParams>;
}): Promise<ReactElement> => {
  const { article, lang } = await params;
  const articleData = await getArticleBySlug(article, lang);

  if (!articleData) {
    notFound();
  }

  return <ArticlePageView article={articleData} />;
};

export default Article;
