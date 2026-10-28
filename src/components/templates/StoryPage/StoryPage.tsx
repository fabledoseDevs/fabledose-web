'use client';

import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useState } from 'react';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';
import { Toast } from '@/atoms/Toast';
import { auth } from '@/config/firebase';
import { useChildProfiles } from '@/contexts/ChildProfilesContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useSidebarState } from '@/contexts/SidebarContext';
import { getTileCover } from '@/fables/fables.covers';
import { useAudiobookProgress } from '@/hooks/useAudiobookProgress';
import { useChildAccess } from '@/hooks/useChildAccess';
import { useFavorites } from '@/hooks/useFavorites';
import type { FavoriteWriteResult } from '@/hooks/useFavorites.types';
import { updateReaderLocation, useReaderStart } from '@/hooks/useReaderStart';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useDictionary } from '@/lang/DictionaryProvider';
import { StoryAccessControl } from '@/molecules/SettingsProfiles/StoryAccessControl';
import { SyncStatus } from '@/molecules/SyncStatus/SyncStatus';
import Audiobook from '@/organisms/Audiobook';
import { AUDIOBOOK_SOURCE_TYPE } from '@/organisms/Audiobook/Audiobook.types';
import Slideshow from '@/organisms/Slideshow';
import { STORY_CARD_VARIANT } from '@/organisms/StoryCard/StoryCard.types';

import { StoryCardWithProgress } from './StoryCardWithProgress';
import {
  AccessNotice,
  AudioPageContent,
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
  const {
    activeProfileId,
    loading: profilesLoading,
    revision: profileRevision,
  } = useChildProfiles();
  const access = useChildAccess();
  const accessReason = access.reason(fable.meta.id);
  const childText = useDictionary().childProfiles;
  const router = useRouter();
  const { settings, refreshPlanFromFirebase } = useSettings();
  const { isHidden: sidebarHidden, setEnableAutoHide } = useSidebarState();
  const { librarySync: text, audiobook: audioText } = useDictionary();
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
    useReadingProgress(profilesLoading ? null : userId, activeProfileId);
  const progressSaveKey = `${account.revision}/${profileRevision}/${userId}/${fable.meta.id}`;
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
  } = useFavorites(profilesLoading ? null : userId, activeProfileId);

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

  const audioSource = toPublicUrl(fable.content.audio.files[lang] || '');
  const audioIdentity = JSON.stringify([
    account.revision,
    profileRevision,
    activeProfileId,
    userId,
    fable.meta.id,
    lang,
    audioSource,
  ]);
  const audioProgress = useAudiobookProgress({
    userId,
    profileId: activeProfileId,
    fableId: fable.meta.id,
    locale: lang,
    source: audioSource,
    enabled:
      account.checked &&
      !profilesLoading &&
      !accessReason &&
      effectiveMode === 'audiobook',
  });
  const [slowAudioIdentity, setSlowAudioIdentity] = useState<string | null>(
    null,
  );
  useEffect(() => {
    setSlowAudioIdentity(null);
    if (!audioProgress.saving) return;
    const timer = window.setTimeout(
      () => setSlowAudioIdentity(audioIdentity),
      5000,
    );
    return () => window.clearTimeout(timer);
  }, [audioProgress.saving, audioIdentity]);

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
    authChecked: account.checked && !profilesLoading,
    accountRevision: account.revision + profileRevision,
    fableId: fable.meta.id,
    enabled: !accessReason && effectiveMode === 'slideshow',
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

  if (accessReason)
    return (
      <StoryPageBody $sidebarHidden={sidebarHidden}>
        <StoryPageCenteredContent>
          <AccessNotice>
            <div role="status">
              <Paragraph
                color={FOREGROUND_COLOR.WHITE}
                alignment={TEXT_ALIGNMENT.CENTER}
              >
                {accessReason === 'loading'
                  ? childText.loading
                  : accessReason === 'excluded'
                  ? childText.blockedExcluded
                  : childText.blockedHours}
              </Paragraph>
            </div>
            {accessReason !== 'loading' && (
              <Button
                text={childText.backLibrary}
                actionType={ACTION_TYPE.NAVIGATION}
                variant={BUTTON_VARIANT.RED}
                payload={`/${lang}/library`}
                width={{ widthType: WIDTH_TYPE.PX, widthValue: 240 }}
              />
            )}
          </AccessNotice>
        </StoryPageCenteredContent>
      </StoryPageBody>
    );

  if (effectiveMode === 'audiobook') {
    return (
      <StoryPageBody $sidebarHidden={sidebarHidden}>
        <AudioPageContent>
          {audioProgress.saveError ? (
            <SyncStatus
              isError
              message={audioText.saveFailed}
              onRetry={audioProgress.retrySave}
              retryLabel={text.retrySave}
            />
          ) : audioProgress.saving && slowAudioIdentity === audioIdentity ? (
            <SyncStatus message={audioText.saving} />
          ) : null}
          {audioProgress.ready && favoritesError ? (
            <SyncStatus
              isError
              message={canRetryFavorite ? text.favoriteFailed : text.loadFailed}
              onRetry={
                canRetryFavorite
                  ? () => void handleRetryFavorite()
                  : () => void refreshFavorites()
              }
              retryLabel={canRetryFavorite ? text.retrySave : text.refresh}
            />
          ) : isPending(fable.meta.id) ? (
            <SyncStatus message={text.savingFavorite} />
          ) : null}
          {!audioSource ? (
            <SyncStatus
              message={audioText.unavailable}
              onRetry={() => router.push(introUrl)}
              retryLabel={audioText.close}
            />
          ) : !audioProgress.ready || audioProgress.readError ? (
            <SyncStatus
              message={
                audioProgress.readError
                  ? audioText.loadFailed
                  : audioText.loading
              }
              isError={Boolean(audioProgress.readError)}
              onRetry={
                audioProgress.readError
                  ? () => {
                      audioProgress.retryRead();
                      void refreshFavorites();
                    }
                  : undefined
              }
              retryLabel={text.refresh}
            />
          ) : (
            <Audiobook
              key={audioIdentity}
              initialPositionSeconds={audioProgress.initialPosition}
              liked={isFavorited(fable.meta.id)}
              likeDisabled={
                !userId ||
                favoritesLoading ||
                isPending(fable.meta.id) ||
                Boolean(favoritesError && !canRetryFavorite)
              }
              onLikeChange={() => {
                void handleToggleFavorite();
              }}
              onPlaybackPositionChange={audioProgress.record}
              onPlaybackCommit={audioProgress.commit}
              source={{
                title,
                coverUrl: toPublicUrl(
                  fable.meta.covers.audioCover ||
                    fable.meta.covers.fullCover ||
                    getTileCover(fable.meta.covers, lang) ||
                    fable.meta.covers.mainCover ||
                    '',
                ),
                audioUrl: audioSource,
                sourceType: AUDIOBOOK_SOURCE_TYPE.LOCAL,
              }}
              onClose={() => {
                router.push(introUrl);
              }}
            />
          )}
        </AudioPageContent>
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
          key={`${account.revision}/${profileRevision}/${fable.meta.id}`}
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
        <StoryAccessControl storyId={fable.meta.id} />
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
            fullDescription:
              fable.meta.fullDescription[lang] ||
              fable.meta.fullDescription.en ||
              fable.meta.fullDescription.pl,
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
