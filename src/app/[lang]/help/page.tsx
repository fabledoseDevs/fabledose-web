import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { getAllArticles } from '@/articles/articles.data';
import { HelpCenter } from '@/components/templates/HelpCenter/HelpCenter';
import { getDictionary } from '@/lang/lang.helpers';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> => {
  const { lang } = await params;
  return { title: `${getDictionary(lang).helpCenter.title} | Fabledose` };
};
const Help = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<ReactElement> => {
  const { lang } = await params;
  return <HelpCenter articles={await getAllArticles(lang)} />;
};
export default Help;
