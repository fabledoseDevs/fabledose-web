import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { getFableBySlug } from '@/fables/fables.data';

interface FableRouteParams {
  lang: string;
  slug: string;
}

const toParagraphArray = (paragraphs?: string | string[]): string[] => {
  if (!paragraphs) {
    return [];
  }

  return Array.isArray(paragraphs) ? paragraphs : [paragraphs];
};

const FablePage = async ({
  params,
}: {
  params: Promise<FableRouteParams>;
}): Promise<ReactElement> => {
  const { lang, slug } = await params;
  const fable = await getFableBySlug(slug, lang);

  if (!fable) {
    notFound();
  }

  const locale = fable.content.locale;
  const title =
    fable.meta.title[locale] || fable.meta.title.en || fable.meta.id;
  const shortDescription =
    fable.meta.shortDescription[locale] || fable.meta.shortDescription.en;
  const fullDescription = fable.meta.fullDescription[locale];

  return (
    <main style={{ padding: '24px' }}>
      <h1>{title}</h1>
      {shortDescription ? <p>{shortDescription}</p> : null}
      {fullDescription ? <p>{fullDescription.synopsis}</p> : null}
      {fullDescription ? <p>{fullDescription.comment}</p> : null}

      {fable.content.text.slides.map((slide, slideIndex) => (
        <section key={`${fable.meta.id}-slide-${slideIndex}`}>
          {toParagraphArray(slide.paragraphs).map(
            (paragraph, paragraphIndex) => (
              <p
                key={`${fable.meta.id}-slide-${slideIndex}-paragraph-${paragraphIndex}`}
              >
                {paragraph}
              </p>
            ),
          )}
        </section>
      ))}
    </main>
  );
};

export default FablePage;
