'use client';

import { useEffect, useState } from 'react';

import type { FavoriteData, ReadingProgressData } from '@/config/firestore';
import { FableWithMeta, getFablesIndexClient, getTotalSlides } from '../FavoritePage.utils';

interface UseFavoritesDataProps {
  favorites: FavoriteData[];
  continueReading: ReadingProgressData[];
  loading: boolean;
  currentLang: 'pl' | 'en';
}

export const useFavoritesData = ({
  favorites,
  continueReading,
  loading,
  currentLang,
}: UseFavoritesDataProps) => {
  const [favoriteFables, setFavoriteFables] = useState<FableWithMeta[]>([]);
  const [continueReadingFables, setContinueReadingFables] = useState<FableWithMeta[]>([]);
  const [loadingFables, setLoadingFables] = useState(true);

  useEffect(() => {
    const loadFableData = async () => {
      if (loading) {
        return;
      }

      if (favorites.length === 0 && continueReading.length === 0) {
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
              const slug = fable.meta.slug[currentLang];
              return {
                meta: fable.meta,
                url: `/${currentLang}/fable/${slug}`,
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
              const slug = fable.meta.slug[currentLang];
              const slideParam = cr.currentSlide > 0 ? `&slide=${cr.currentSlide}` : '';
              const storyPath = fable.meta.contentPointers.story;
              const totalSlides = await getTotalSlides(storyPath);
              return {
                meta: fable.meta,
                url: `/${currentLang}/fable/${slug}?mode=slideshow${slideParam}`,
                currentSlide: cr.currentSlide,
                totalSlides,
              } as FableWithMeta;
            }
            return null;
          })
        ).then(results => results.filter((f): f is FableWithMeta => f !== null));

        setFavoriteFables(favs);
        setContinueReadingFables(continuing);
      } catch (error) {
        console.error('Error loading fable data:', error);
      } finally {
        setLoadingFables(false);
      }
    };

    void loadFableData();
  }, [loading, favorites, continueReading, currentLang]);

  return {
    favoriteFables,
    continueReadingFables,
    loadingFables,
  };
};
