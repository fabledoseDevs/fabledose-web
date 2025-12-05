import { DictionaryEn } from './dictionaries/en';
import { DictionaryPL } from './dictionaries/pl';
import type { DictionaryType } from './lang.types';

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
