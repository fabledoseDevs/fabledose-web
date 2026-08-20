import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import StoryPage from '@/components/templates/StoryPage';
import type { StoryPageMode } from '@/components/templates/StoryPage/StoryPage.types';
import { getFableBySlug, getFablesIndex } from '@/fables/fables.data';
import type { FableLocale } from '@/fables/fables.types';
import Sidebar from '@/organisms/Sidebar';

interface FableRouteParams {
  lang: string;
  slug: string;
}

interface FableSearchParams {
  mode?: string | string[];
  animated?: string | string[];
  audiobook?: string | string[];
  slide?: string | string[];
}

const normalizeLocale = (value: string): FableLocale =>
  value === 'pl' ? 'pl' : 'en';

const getFirstParam = (value: string | string[] | undefined): string | null => {
  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return typeof value === 'string' ? value : null;
};

const resolveStoryMode = (searchParams: FableSearchParams): StoryPageMode => {
  const mode = getFirstParam(searchParams.mode);

  if (mode === 'slideshow' || mode === 'animated') {
    return 'slideshow';
  }

  if (mode === 'audiobook') {
    return 'audiobook';
  }

  if (searchParams.animated !== undefined) {
    return 'slideshow';
  }

  if (searchParams.audiobook !== undefined) {
    return 'audiobook';
  }

  return 'intro';
};

export const generateStaticParams = async (): Promise<FableRouteParams[]> => {
  const fables = await getFablesIndex();
  const results: FableRouteParams[] = [];

  for (const fable of fables) {
    for (const locale of ['pl', 'en'] as const) {
      const localizedSlug = fable.slug[locale];
      if (!localizedSlug) {
        continue;
      }

      results.push({
        lang: locale,
        slug: localizedSlug,
      });
    }
  }

  return results;
};

const FablePage = async ({
  params,
  searchParams,
}: {
  params: Promise<FableRouteParams>;
  searchParams: Promise<FableSearchParams>;
}): Promise<ReactElement> => {
  const { lang, slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(lang);
  const mode = resolveStoryMode(query);
  const fable = await getFableBySlug(slug, locale);
  const initialSlide = query.slide ? parseInt(getFirstParam(query.slide) || '0', 10) : 0;

  if (!fable) {
    notFound();
  }

  return ( 
    <>
      <Sidebar />
      <StoryPage fable={fable} mode={mode} lang={locale} initialSlide={initialSlide} />
    </>
  );
};

export default FablePage;
