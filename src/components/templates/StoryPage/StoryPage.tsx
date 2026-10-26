'use client';

import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useState } from 'react';

import { Toast } from '@/atoms/Toast';
import { auth } from '@/config/firebase';
import { useSettings } from '@/contexts/SettingsContext';
import { useSidebarState } from '@/contexts/SidebarContext';
import { useFavorites } from '@/hooks/useFavorites';
import type { FavoriteWriteResult } from '@/hooks/useFavorites.types';
import { updateReaderLocation, useReaderStart } from '@/hooks/useReaderStart';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useDictionary } from '@/lang/DictionaryProvider';
import { SyncStatus } from '@/molecules/SyncStatus/SyncStatus';
import Audiobook from '@/organisms/Audiobook';
import { AUDIOBOOK_SOURCE_TYPE } from '@/organisms/Audiobook/Audiobook.types';
import Slideshow from '@/organisms/Slideshow';
import { STORY_CARD_VARIANT } from '@/organisms/StoryCard/StoryCard.types';

import { StoryCardWithProgress } from './StoryCardWithProgress';
import {
  FavoriteButton,
  FavoriteControl,
  FavoriteTooltip,
  IntroWrapper,
  StoryPageBody,
  StoryPageCenteredContent,
} from './StoryPage.styled';
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
  initialSlide,
}: StoryPageProps) => {
  const router = useRouter();
  const { settings, refreshPlanFromFirebase } = useSettings();
  const { isHidden: sidebarHidden, setEnableAutoHide } = useSidebarState();
  const { librarySync: text } = useDictionary();
  const [account, setAccount] = useState<{
    uid: string | null;
    checked: boolean;
    revision: number;
  }>({ uid: null, checked: false, revision: 0 });
  const userId = account.uid;
  const favoriteTooltipId = useId();
  const [showFavoriteTooltip, setShowFavoriteTooltip] = useState(false);
  useEffect(() => {
    if (!showFavoriteTooltip) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowFavoriteTooltip(false);
    };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [showFavoriteTooltip]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { saveProgress, getProgress, saving, saveError, readError, retrySave } =
    useReadingProgress(userId);
  const progressSaveKey = `${account.revision}/${userId}/${fable.meta.id}`;
  const [slowProgressSaveKey, setSlowProgressSaveKey] = useState<string | null>(
    null,
  );
  useEffect(() => {
    setSlowProgressSaveKey(null);
    if (!saving) return;
    const timer = window.setTimeout(
      () => setSlowProgressSaveKey(progressSaveKey),
      5000,
    );
    return () => window.clearTimeout(timer);
  }, [saving, progressSaveKey]);
  const showSavingProgress = saving && slowProgressSaveKey === progressSaveKey;
  const {
    isFavorited,
    toggleFavorite,
    isPending,
    loading: favoritesLoading,
    error: favoritesError,
    canRetryFavorite,
    retryFavorite,
    refreshFavorites,
  } = useFavorites(userId);

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
      const uid = user?.uid ?? null;
      setAccount(previous =>
        previous.checked && previous.uid === uid
          ? previous
          : { uid, checked: true, revision: previous.revision + 1 },
      );
      setToastMessage(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    void refreshPlanFromFirebase();
  }, [refreshPlanFromFirebase]);

  const handleSlideChange = useCallback(
    (slideIndex: number) => {
      updateReaderLocation(slideIndex);
      if (userId) {
        void saveProgress(fable.meta.id, slideIndex, false);
      }
    },
    [userId, fable.meta.id, saveProgress],
  );

  const handleCompleted = useCallback(() => {
    updateReaderLocation(fable.content.text.slides.length - 1);
    if (userId) {
      void saveProgress(
        fable.meta.id,
        fable.content.text.slides.length - 1,
        true,
      );
    }
  }, [userId, fable.meta.id, fable.content.text.slides.length, saveProgress]);

  const showFavoriteResult = useCallback(
    (result: FavoriteWriteResult) => {
      if (result)
        setToastMessage(
          result === 'added' ? text.favoriteAdded : text.favoriteRemoved,
        );
    },
    [text.favoriteAdded, text.favoriteRemoved],
  );
  const handleToggleFavorite = useCallback(async () => {
    setToastMessage(null);
    showFavoriteResult(await toggleFavorite(fable.meta.id));
  }, [fable.meta.id, toggleFavorite, showFavoriteResult]);
  const handleRetryFavorite = useCallback(async () => {
    showFavoriteResult(await retryFavorite());
  }, [retryFavorite, showFavoriteResult]);
  const reader = useReaderStart({
    userId,
    authChecked: account.checked,
    accountRevision: account.revision,
    fableId: fable.meta.id,
    enabled: effectiveMode === 'slideshow',
    initialSlide,
    getProgress,
  });
  const syncNotice = saveError ? (
    <SyncStatus
      floating
      isError
      message={text.progressFailed}
      onRetry={() => void retrySave()}
      retryLabel={text.retrySave}
    />
  ) : favoritesError ? (
    <SyncStatus
      floating
      isError
      message={canRetryFavorite ? text.favoriteFailed : text.loadFailed}
      onRetry={
        canRetryFavorite
          ? () => void handleRetryFavorite()
          : () => void refreshFavorites()
      }
      retryLabel={canRetryFavorite ? text.retrySave : text.refresh}
    />
  ) : showSavingProgress || isPending(fable.meta.id) ? (
    <SyncStatus
      floating
      message={showSavingProgress ? text.savingProgress : text.savingFavorite}
    />
  ) : null;

  if (effectiveMode === 'audiobook') {
    return (
      <StoryPageBody $sidebarHidden={sidebarHidden}>
        {syncNotice}
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
    if (!reader.ready || readError)
      return (
        <StoryPageBody $sidebarHidden={sidebarHidden}>
          <StoryPageCenteredContent>
            <SyncStatus
              message={
                readError ? text.progressLoadFailed : text.loadingProgress
              }
              isError={Boolean(readError)}
              onRetry={readError ? reader.retry : undefined}
              retryLabel={text.refresh}
            />
          </StoryPageCenteredContent>
        </StoryPageBody>
      );
    return (
      <StoryPageBody $sidebarHidden={sidebarHidden}>
        {syncNotice}
        <Slideshow
          key={`${account.revision}/${fable.meta.id}`}
          fable={fable}
          settings={settings}
          quality={slideshowQuality}
          initialSlide={reader.slide}
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
      {syncNotice}
      <IntroWrapper>
        {userId && (
          <FavoriteControl
            onMouseEnter={() => setShowFavoriteTooltip(true)}
            onMouseLeave={() => setShowFavoriteTooltip(false)}
            onFocus={() => setShowFavoriteTooltip(true)}
            onBlur={() => setShowFavoriteTooltip(false)}
          >
            <FavoriteButton
              type="button"
              aria-describedby={
                showFavoriteTooltip ? favoriteTooltipId : undefined
              }
              onClick={handleToggleFavorite}
              disabled={
                favoritesLoading ||
                isPending(fable.meta.id) ||
                Boolean(favoritesError && !canRetryFavorite)
              }
              aria-busy={isPending(fable.meta.id)}
              aria-pressed={isFavored}
              aria-label={isFavored ? text.removeFavorite : text.addFavorite}
            >
              {isFavored ? (
                <HeartSolidIcon style={{ color: '#ff0000' }} />
              ) : (
                <HeartOutlineIcon style={{ color: '#ffffff' }} />
              )}
            </FavoriteButton>
            {showFavoriteTooltip && (
              <FavoriteTooltip id={favoriteTooltipId} role="tooltip">
                {isFavored ? text.removeFavorite : text.addFavorite}
              </FavoriteTooltip>
            )}
          </FavoriteControl>
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
          key={toastMessage}
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </StoryPageBody>
  );
};
