'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
import { auth } from '@/config/firebase';
import { useChildProfiles } from '@/contexts/ChildProfilesContext';
import { useChildAccess } from '@/hooks/useChildAccess';
import { useFavorites } from '@/hooks/useFavorites';
import { useDictionary } from '@/lang/DictionaryProvider';
import { ProfileAccessNotice } from '@/molecules/SettingsProfiles/ProfileAccessNotice';
import { SyncStatus } from '@/molecules/SyncStatus/SyncStatus';
import DesktopTilesSlider from '@/organisms/DesktopTilesSlider';

import {
  CarouselSection,
  FavoritePageBody,
  SectionSpacing,
} from './FavoritePage.styled';
import type { FavoritePage as FavoritePageType } from './FavoritePage.types';
import { normalizeLocale } from './FavoritePage.utils';
import { useFableTiles, useFavoritesData } from './hooks';

export const FavoritePage: FavoritePageType = () => {
  const { activeProfileId, loading: profilesLoading } = useChildProfiles();
  const { canDiscover } = useChildAccess();
  const { librarySync: text } = useDictionary();
  const params = useParams();
  const currentLang = normalizeLocale((params?.lang as string) || 'en');
  const [userId, setUserId] = useState<string | null>(null);

  const {
    favorites,
    continueReading,
    loading: loadingFavorites,
    error,
    refreshFavorites,
  } = useFavorites(profilesLoading ? null : userId, activeProfileId);
  const {
    favoriteFables,
    continueReadingFables,
    loadingFables,
    error: metadataError,
  } = useFavoritesData({
    favorites,
    continueReading,
    loading: loadingFavorites || profilesLoading,
    currentLang,
  });

  const favoriteTiles = useFableTiles(
    favoriteFables.filter(item => canDiscover(item.meta.id)),
    currentLang,
  );
  const continueReadingTiles = useFableTiles(
    continueReadingFables.filter(item => canDiscover(item.meta.id)),
    currentLang,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUserId(user?.uid ?? null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FavoritePageBody>
      <ProfileAccessNotice />
      <SectionSpacing>
        <Headline
          weight={HEADLINE_TYPE.BIG}
          color={HEADLINE_FOREGROUND_COLOR.WHITE}
        >
          {text.favoritesTitle}
        </Headline>
        <Paragraph
          color={PARAGRAPH_FOREGROUND_COLOR.WHITE}
          alignment={TEXT_ALIGNMENT.CENTER}
        >
          {text.favoritesDescription}
        </Paragraph>
      </SectionSpacing>

      {(loadingFavorites || loadingFables) && !error && (
        <SyncStatus message={text.loading} />
      )}
      {(error || metadataError) && (
        <SyncStatus
          isError
          message={text.loadFailed}
          onRetry={() => void refreshFavorites()}
          retryLabel={text.refresh}
        />
      )}
      {!loadingFavorites &&
        !error &&
        !metadataError &&
        continueReadingTiles.length > 0 && (
          <CarouselSection>
            <DesktopTilesSlider
              title={text.continuingTitle}
              tiles={continueReadingTiles}
            />
          </CarouselSection>
        )}

      {!loadingFavorites &&
        !error &&
        !metadataError &&
        favoriteTiles.length > 0 && (
          <CarouselSection>
            <DesktopTilesSlider
              title={text.myFavorites}
              tiles={favoriteTiles}
            />
          </CarouselSection>
        )}

      {!loadingFavorites &&
        !loadingFables &&
        !error &&
        !metadataError &&
        favoriteTiles.length === 0 &&
        continueReadingTiles.length === 0 && (
          <SectionSpacing>
            <Paragraph
              color={PARAGRAPH_FOREGROUND_COLOR.WHITE}
              alignment={TEXT_ALIGNMENT.CENTER}
            >
              {text.empty}
            </Paragraph>
          </SectionSpacing>
        )}
    </FavoritePageBody>
  );
};

export default FavoritePage;
