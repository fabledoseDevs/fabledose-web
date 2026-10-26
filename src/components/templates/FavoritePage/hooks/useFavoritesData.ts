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
  const [snapshot, setSnapshot] = useState<{
    favorites: typeof favorites;
    continueReading: typeof continueReading;
    lang: typeof currentLang;
    favoriteFables: FableWithMeta[];
    continueReadingFables: FableWithMeta[];
    error: Error | null;
  } | null>(null);
  useEffect(() => {
    if (loading) return;
    let active = true;
    const load = async () => {
      try {
        if (!favorites.length && !continueReading.length) {
          setSnapshot({
            favorites,
            continueReading,
            lang: currentLang,
            favoriteFables: [],
            continueReadingFables: [],
            error: null,
          });
          return;
        }
        const index = await getFablesIndexClient();
        const favoriteFables = favorites.flatMap(saved => {
          const fable = index.find(item => item.meta.id === saved.fableId);
          return fable
            ? [{ meta: fable.meta, url: getFableUrl(fable.meta, currentLang) }]
            : [];
        });
        const resolved = await Promise.all(
          continueReading.map(async saved => {
            const fable = index.find(item => item.meta.id === saved.fableId);
            if (!fable) return null;
            return {
              meta: fable.meta,
              url: `${getFableUrl(
                fable.meta,
                currentLang,
              )}?mode=slideshow&slide=${saved.currentSlide}`,
              currentSlide: saved.currentSlide,
              totalSlides: await getTotalSlides(
                fable.meta.contentPointers.story,
              ),
            };
          }),
        );
        if (active)
          setSnapshot({
            favorites,
            continueReading,
            lang: currentLang,
            favoriteFables,
            continueReadingFables: resolved.filter(
              (item): item is NonNullable<typeof item> => item !== null,
            ),
            error: null,
          });
      } catch (cause: unknown) {
        if (active)
          setSnapshot({
            favorites,
            continueReading,
            lang: currentLang,
            favoriteFables: [],
            continueReadingFables: [],
            error:
              cause instanceof Error
                ? cause
                : new Error('Failed to load story metadata'),
          });
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [loading, favorites, continueReading, currentLang]);
  const visible =
    !loading &&
    snapshot?.favorites === favorites &&
    snapshot.continueReading === continueReading &&
    snapshot.lang === currentLang;
  return {
    favoriteFables: visible ? snapshot.favoriteFables : [],
    continueReadingFables: visible ? snapshot.continueReadingFables : [],
    loadingFables: loading || !visible,
    error: visible ? snapshot.error : null,
  };
};
