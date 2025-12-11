'use client';

import React, { createContext, useContext } from 'react';

import type { DictionaryType } from './dictionaries/lang.types';
import type {
  DictionaryProvider as DictionaryProviderType,
  UseDictionary,
} from './DictionaryProvider.types';

const DictionaryContext = createContext<DictionaryType | null>(null);

export const DictionaryProvider: DictionaryProviderType = ({
  dictionary,
  children,
}) => (
  <DictionaryContext.Provider value={dictionary}>
    {children}
  </DictionaryContext.Provider>
);

export const useDictionary: UseDictionary = () => {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return dictionary;
};
