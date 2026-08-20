'use client';

import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useSidebarState } from '@/contexts/SidebarContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { Toast } from '@/atoms/Toast';
import Audiobook from '@/organisms/Audiobook';
import { AUDIOBOOK_SOURCE_TYPE } from '@/organisms/Audiobook/Audiobook.types';
import Slideshow from '@/organisms/Slideshow';
import { STORY_CARD_VARIANT } from '@/organisms/StoryCard/StoryCard.types';
import { StoryCardWithProgress } from './StoryCardWithProgress';
import { auth } from '@/config/firebase';

import { StoryPageBody, StoryPageCenteredContent, IntroWrapper, FavoriteButton } from './StoryPage.styled';
import type {
  StoryPage as StoryPageType,
  StoryPageProps,
} from './StoryPage.types';

const toWarningTag = (tag: string): boolean =>
  tag === 'death' || tag === 'toxic-relations';

const pickLocalized = (
  values: Partial<Record<'pl' | 'en', string>>,
  locale: 'pl' | 'en',
  fallback = '',
): string => values[locale] || values.en || values.pl || fallback;

const toPublicUrl = (value: string): string => {
  if (!value) {
    return '';
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  const normalized = value.replace(/^\/+/, '');

  if (normalized.startsWith('fable-database/')) {
    return `/${normalized}`;
  }

  return `/fable-database/${normalized}`;
};

export const StoryPage: StoryPageType = ({
  fable,
  mode,
  lang,
  initialSlide = 0,
}: StoryPageProps) => {
  const router = useRouter();
  const { settings, refreshPlanFromFirebase } = useSettings();
  const { isHidden: sidebarHidden, setEnableAutoHide } = useSidebarState();
  const [userId, setUserId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { saveProgress } = useReadingProgress(userId);
  const { isFavorited, toggleFavorite } = useFavorites(userId);

  useEffect(() => {
    if (mode === 'intro') {
      setEnableAutoHide(true);
      return () => setEnableAutoHide(false);
    }
  }, [setEnableAutoHide, mode]);

  const localeSlug = pickLocalized(fable.meta.slug, lang, fable.meta.id);
  const title = pickLocalized(fable.meta.title, lang, fable.meta.id);
  const description = pickLocalized(fable.meta.shortDescription, lang, '');
  const introUrl = `/${lang}/fable/${localeSlug}`;
  const isUnlockedAccount =
    settings?.plan === 'family' || settings?.plan === 'ultimate';
  const slideshowQuality = isUnlockedAccount ? 'high' : 'low';
  const effectiveMode =
    mode === 'audiobook' && !isUnlockedAccount ? 'slideshow' : mode;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserId(user?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    void refreshPlanFromFirebase();
  }, [refreshPlanFromFirebase]);

  const handleSlideChange = useCallback(
    (slideIndex: number) => {
      if (userId) {
        void saveProgress(fable.meta.id, slideIndex, false);
      }
    },
    [userId, fable.meta.id, saveProgress],
  );

  const handleCompleted = useCallback(() => {
    if (userId) {
      void saveProgress(fable.meta.id, fable.content.text.slides.length - 1, true);
    }
  }, [userId, fable.meta.id, fable.content.text.slides.length, saveProgress]);

  const handleToggleFavorite = useCallback(() => {
    if (userId) {
      void toggleFavorite(fable.meta.id);
      const isFavored = isFavorited(fable.meta.id);
      setToastMessage(isFavored ? 'Usunięte z ulubionych' : 'Dodano do ulubionych');
    }
  }, [userId, fable.meta.id, toggleFavorite, isFavorited]);

  if (effectiveMode === 'audiobook') {
    return (
      <StoryPageBody $sidebarHidden={sidebarHidden}>
        <StoryPageCenteredContent>
          <Audiobook
            source={{
              title,
              coverUrl: toPublicUrl(
                fable.meta.covers.audioCover ||
                  fable.meta.covers.fullCover ||
                  fable.meta.covers.tileCover ||
                  fable.meta.covers.mainCover ||
                  '',
              ),
              audioUrl: toPublicUrl(fable.content.audio.selected || ''),
              sourceType: AUDIOBOOK_SOURCE_TYPE.LOCAL,
            }}
            onClose={() => {
              router.push(introUrl);
            }}
          />
        </StoryPageCenteredContent>
      </StoryPageBody>
    );
  }

  if (effectiveMode === 'slideshow') {
    return (
      <StoryPageBody $sidebarHidden={sidebarHidden}>
        <Slideshow
          fable={fable}
          settings={settings}
          quality={slideshowQuality}
          initialSlide={initialSlide}
          onGoBack={() => {
            router.push(introUrl);
          }}
          onSlideChange={handleSlideChange}
          onCompleted={handleCompleted}
        />
      </StoryPageBody>
    );
  }

  const isFavored = isFavorited(fable.meta.id);

  return (
    <StoryPageBody $isIntro $sidebarHidden={sidebarHidden}>
      <IntroWrapper>
        {userId && (
          <FavoriteButton
            onClick={handleToggleFavorite}
            aria-label={isFavored ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavored ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavored ? (
              <HeartSolidIcon style={{ color: '#ff0000' }} />
            ) : (
              <HeartOutlineIcon style={{ color: '#ffffff' }} />
            )}
          </FavoriteButton>
        )}
        <StoryCardWithProgress
          variant={STORY_CARD_VARIANT.FULLSCREEN}
          unlockedAccount={isUnlockedAccount}
          fableId={fable.meta.id}
          data={{
            backgroundVideoUrl: toPublicUrl(fable.meta.covers.mainCover || ''),
            backgroundPosterUrl: toPublicUrl(fable.meta.covers.fullCover || ''),
            headline: title,
            description,
            tags: fable.meta.tags.map(tag => ({
              name: tag,
              warning: toWarningTag(tag),
            })),
            readUrl: `/${lang}/fable/${localeSlug}?mode=slideshow`,
            audiobookUrl: `/${lang}/fable/${localeSlug}?mode=audiobook`,
          }}
        />
      </IntroWrapper>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </StoryPageBody>
  );
};
