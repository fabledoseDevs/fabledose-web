import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { DictionaryEn } from './dictionaries/en';
import type { DictionaryType } from './dictionaries/lang.types';
import { DictionaryPL } from './dictionaries/pl';

export const getDictionary = (lang: string): DictionaryType => {
  switch (lang) {
    case 'pl':
      return DictionaryPL;
    case 'en':
      return DictionaryEn;
    default:
      return DictionaryEn;
  }
};

export const handleLanguageChange = (
  selectedOption: string,
  currentLang: string,
  pathname: string | null,
  router: AppRouterInstance,
): void => {
  const localeMap: Record<string, string> = {
    Polski: 'pl',
    English: 'en',
  };

  const newLocale = localeMap[selectedOption];
  if (!newLocale || newLocale === currentLang) return;
  document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

  if (!pathname) {
    router.push(`/${newLocale}`);
    return;
  }

  const segments = pathname.split('/');
  segments[1] = newLocale; // Replace the language segment
  const newPath = segments.join('/');

  router.push(newPath);
};
