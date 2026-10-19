'use client';

import { useMemo } from 'react';

import { toFableTile } from '@/fables/fables.library';
import type { FableTileProps } from '@/molecules/FableTile/FableTile.types';

import type { FableWithMeta } from '../FavoritePage.utils';

export const useFableTiles = (
  fables: FableWithMeta[],
  currentLang: 'pl' | 'en',
): FableTileProps[] =>
  useMemo(
    () =>
      fables.map(fable => ({
        ...toFableTile(fable.meta, currentLang),
        fableUrl: fable.url,
        registerTile: false,
        currentSlide: fable.currentSlide,
        totalSlides: fable.totalSlides,
      })),
    [fables, currentLang],
  );
