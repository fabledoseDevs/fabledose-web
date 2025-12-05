import type { ReactElement } from 'react';

import { getDictionary } from '@/lang/lang';

import { LandingPageClient } from './LandingPage.client';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<ReactElement> {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return <LandingPageClient dict={dict} />;
}
