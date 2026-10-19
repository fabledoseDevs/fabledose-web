'use client';

import { useEffect, useState } from 'react';

import { getFableUrl } from '@/fables/fables.library';

import type {
  UseFavoritesDataProps,
  UseFavoritesDataReturnValues,
} from '../FavoritePage.types';
import type { FableWithMeta } from '../FavoritePage.utils';
import { getFablesIndexClient, getTotalSlides } from '../FavoritePage.utils';

export const useFavoritesData = ({
  favorites,
  continueReading,
  loading,
  currentLang,
}: UseFavoritesDataProps): UseFavoritesDataReturnValues => {
  const [favoriteFables, setFavoriteFables] = useState<FableWithMeta[]>([]);
  const [continueReadingFables, setContinueReadingFables] = useState<
    FableWithMeta[]
  >([]);
  const [loadingFables, setLoadingFables] = useState(true);

  useEffect(() => {
    let active = true;
    const loadFableData = async () => {
      if (loading) {
        return;
      }

      if (favorites.length === 0 && continueReading.length === 0) {
        setFavoriteFables([]);
        setContinueReadingFables([]);
        setLoadingFables(false);
        return;
      }

      try {
        setLoadingFables(true);
        const fablesIndex = await getFablesIndexClient();

        const favs = favorites
          .map(fav => {
            const fable = fablesIndex.find(f => f.meta.id === fav.fableId);
            if (fable) {
              return {
                meta: fable.meta,
                url: getFableUrl(fable.meta, currentLang),
                currentSlide: undefined,
              } as FableWithMeta;
            }
            return null;
          })
          .filter((f): f is FableWithMeta => f !== null);

        const continuing = await Promise.all(
          continueReading.map(async cr => {
            const fable = fablesIndex.find(f => f.meta.id === cr.fableId);
            if (fable) {
              const slideParam =
                cr.currentSlide > 0 ? `&slide=${cr.currentSlide}` : '';
              const storyPath = fable.meta.contentPointers.story;
              const totalSlides = await getTotalSlides(storyPath);
              return {
                meta: fable.meta,
                url: `${getFableUrl(
                  fable.meta,
                  currentLang,
                )}?mode=slideshow${slideParam}`,
                currentSlide: cr.currentSlide,
                totalSlides,
              } as FableWithMeta;
            }
            return null;
          }),
        ).then(results =>
          results.filter((f): f is FableWithMeta => f !== null),
        );

        if (!active) return;
        setFavoriteFables(favs);
        setContinueReadingFables(continuing);
      } catch (error) {
        console.error('Error loading fable data:', error);
      } finally {
        if (active) setLoadingFables(false);
      }
    };

    void loadFableData();
    return () => {
      active = false;
    };
  }, [loading, favorites, continueReading, currentLang]);

  return {
    favoriteFables,
    continueReadingFables,
    loadingFables,
  };
};
