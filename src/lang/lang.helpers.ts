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
