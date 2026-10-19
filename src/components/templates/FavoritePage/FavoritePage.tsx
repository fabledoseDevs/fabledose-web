'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { type ReactElement, useEffect, useState } from 'react';

import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR as HEADLINE_FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR as PARAGRAPH_FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';
import DesktopTilesSlider from '@/organisms/DesktopTilesSlider';
import { auth } from '@/config/firebase';
import { useFavorites } from '@/hooks/useFavorites';

import {
  FavoritePageBody,
  SectionSpacing,
  CarouselSection,
} from './FavoritePage.styled';
import type { FavoritePage as FavoritePageType } from './FavoritePage.types';
import { normalizeLocale } from './FavoritePage.utils';
import { useFavoritesData, useFableTiles } from './hooks';



export const FavoritePage: FavoritePageType = () => {
  const params = useParams();
  const currentLang = normalizeLocale((params?.lang as string) || 'en');
  const [userId, setUserId] = useState<string | null>(null);

  const { favorites, continueReading, loading: loadingFavorites } = useFavorites(userId);
  const { favoriteFables, continueReadingFables } = useFavoritesData({
    favorites,
    continueReading,
    loading: loadingFavorites,
    currentLang,
  });

  const favoriteTiles = useFableTiles(favoriteFables, currentLang);
  const continueReadingTiles = useFableTiles(continueReadingFables, currentLang);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUserId(user?.uid ?? null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FavoritePageBody>
      <SectionSpacing>
        <Headline
          weight={HEADLINE_TYPE.BIG}
          color={HEADLINE_FOREGROUND_COLOR.WHITE}
        >
          Ulubione
        </Headline>
        <Paragraph
          color={PARAGRAPH_FOREGROUND_COLOR.WHITE}
          alignment={TEXT_ALIGNMENT.CENTER}
        >
          Twoje ulubione historie w jednym miejscu
        </Paragraph>
      </SectionSpacing>

      {continueReadingTiles.length > 0 && (
        <CarouselSection>
          <DesktopTilesSlider
            title="Kontynuuj czytanie"
            tiles={continueReadingTiles}
          />
        </CarouselSection>
      )}

      {favoriteTiles.length > 0 && (
        <CarouselSection>
          <DesktopTilesSlider
            title="Moje ulubione"
            tiles={favoriteTiles}
          />
        </CarouselSection>
      )}

      {favoriteTiles.length === 0 && continueReadingTiles.length === 0 && (
        <SectionSpacing>
          <Paragraph
            color={PARAGRAPH_FOREGROUND_COLOR.WHITE}
            alignment={TEXT_ALIGNMENT.CENTER}
          >
            Brak ulubionych. Zacznij dodawać swoje ulubione historie!
          </Paragraph>
        </SectionSpacing>
      )}
    </FavoritePageBody>
  );
};

export default FavoritePage;
