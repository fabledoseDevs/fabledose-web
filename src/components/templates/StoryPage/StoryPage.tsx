'use client';

import { useRouter } from 'next/navigation';

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
import Audiobook from '@/organisms/Audiobook';
import { AUDIOBOOK_SOURCE_TYPE } from '@/organisms/Audiobook/Audiobook.types';
import StoryCard from '@/organisms/StoryCard';
import { STORY_CARD_VARIANT } from '@/organisms/StoryCard/StoryCard.types';

import { StoryPageBody, StoryPlaceholder } from './StoryPage.styled';
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
  const localeSlug = pickLocalized(fable.meta.slug, lang, fable.meta.id);
  const title = pickLocalized(fable.meta.title, lang, fable.meta.id);
  const description = pickLocalized(fable.meta.shortDescription, lang, '');
  const introUrl = `/${lang}/fable/${localeSlug}`;

  if (mode === 'audiobook') {
    return (
      <StoryPageBody>
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
      </StoryPageBody>
    );
  }

  if (mode === 'slideshow') {
    return (
      <StoryPageBody>
        <StoryPlaceholder>
          <Headline
            weight={HEADLINE_TYPE.BIG}
            color={HEADLINE_FOREGROUND_COLOR.WHITE}
          >
            {title}
          </Headline>
          <Paragraph
            color={PARAGRAPH_FOREGROUND_COLOR.WHITE}
            alignment={TEXT_ALIGNMENT.LEFT}
          >
            Slideshow mode is reserved. UI components for slides and controls
            will be added next.
          </Paragraph>
        </StoryPlaceholder>
      </StoryPageBody>
    );
  }

  return (
    <StoryPageBody>
      <StoryCard
        variant={STORY_CARD_VARIANT.FULLSCREEN}
        unlockedAccount={false}
        data={{
          backgroundVideoUrl: toPublicUrl(fable.meta.covers.mainCover || ''),
          backgroundPosterUrl: toPublicUrl(fable.meta.covers.fullCover || ''),
          headline: title,
          description,
          tags: fable.meta.tags.map(tag => ({
            name: tag,
            warning: toWarningTag(tag),
          })),
        }}
      />
    </StoryPageBody>
  );
};
