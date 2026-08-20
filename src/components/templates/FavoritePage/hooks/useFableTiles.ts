'use client';

import { useMemo } from 'react';
import { FableWithMeta, getImageUrl } from '../FavoritePage.utils';



interface FableTile {
  imageUrl: string;
  fableTitle: string;
  fableDescription: string;
  fableUrl: string;
  registerTile: boolean;
  currentSlide?: number;
  totalSlides?: number;
}

export const useFableTiles = (
  fables: FableWithMeta[],
  currentLang: 'pl' | 'en',
): FableTile[] => {
  return useMemo(() => {
    if (fables.length === 0) return [];

    return fables.map(fable => {
      const imageUrl = getImageUrl(
        fable.meta.covers.tileCover,
        fable.meta.covers.fullCover,
        fable.meta.covers.mainCover,
      );

      return {
        imageUrl,
        fableTitle: fable.meta.title[currentLang] || '',
        fableDescription: fable.meta.title[currentLang] || '',
        fableUrl: fable.url,
        registerTile: false,
        currentSlide: fable.currentSlide,
        totalSlides: fable.totalSlides,
      };
    });
  }, [fables, currentLang]);
};
