'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSettings } from '@/contexts/SettingsContext';
import Audiobook from '@/organisms/Audiobook';
import { AUDIOBOOK_SOURCE_TYPE } from '@/organisms/Audiobook/Audiobook.types';
import Slideshow from '@/organisms/Slideshow';
import StoryCard from '@/organisms/StoryCard';
import { STORY_CARD_VARIANT } from '@/organisms/StoryCard/StoryCard.types';

import { StoryPageBody, StoryPageCenteredContent } from './StoryPage.styled';
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
}: StoryPageProps) => {
  const router = useRouter();
  const { settings, refreshPlanFromFirebase } = useSettings();
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
    void refreshPlanFromFirebase();
  }, [refreshPlanFromFirebase]);

  if (effectiveMode === 'audiobook') {
    return (
      <StoryPageBody>
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
      <StoryPageBody>
        <Slideshow
          fable={fable}
          settings={settings}
          quality={slideshowQuality}
          onGoBack={() => {
            router.push(introUrl);
          }}
        />
      </StoryPageBody>
    );
  }

  return (
    <StoryPageBody>
      <StoryCard
        variant={STORY_CARD_VARIANT.FULLSCREEN}
        unlockedAccount={isUnlockedAccount}
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
    </StoryPageBody>
  );
};
