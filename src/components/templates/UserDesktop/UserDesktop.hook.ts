import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import { TAG_NAME } from '@/atoms/TagIcon/TagIcon.types';
import type { StoryCardData } from '@/organisms/StoryCard/StoryCard.types';

import type { UseUserDesktop as UseUserDesktopType } from './UserDesktop.types';

interface IndexMeta {
  id?: string;
  slug?: Partial<Record<'pl' | 'en', string>>;
  title?: Partial<Record<'pl' | 'en', string>>;
  shortDescription?: Partial<Record<'pl' | 'en', string>>;
  tags?: string[];
  covers?: Partial<
    Record<'tileCover' | 'mainCover' | 'fullCover' | 'audioCover', string>
  >;
  contentPointers?: {
    story?: string;
    text?: Partial<Record<'pl' | 'en', string>>;
  };
}

interface IndexItem {
  meta?: IndexMeta;
}

interface IndexResponse {
  tales?: IndexItem[];
}

const SUPPORTED_TAGS = new Set(Object.values(TAG_NAME));

const toFableDatabaseUrl = (value: string): string => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  const normalized = value.replace(/^\/+/, '');

  if (normalized.startsWith('fable-database/')) {
    return `/${normalized}`;
  }

  return `/fable-database/${normalized}`;
};

const pickLocalized = (
  values: Partial<Record<'pl' | 'en', string>> | undefined,
  locale: 'pl' | 'en',
  fallback = '',
): string => {
  if (!values) {
    return fallback;
  }

  return values[locale] || values.en || values.pl || fallback;
};

const toWarningTag = (tag: TAG_NAME): boolean =>
  tag === TAG_NAME.DEATH || tag === TAG_NAME.TOXIC_RELATIONS;

const inferTaleBasePath = (item: IndexMeta): string | null => {
  const fromStory = item.contentPointers?.story;
  if (fromStory?.endsWith('/story.json')) {
    return fromStory.replace(/\/story\.json$/, '');
  }

  const textPointers = item.contentPointers?.text;
  const textPath = textPointers?.en || textPointers?.pl;

  if (textPath && /\/txt\/[^/]+\.json$/.test(textPath)) {
    return textPath.replace(/\/txt\/[^/]+\.json$/, '');
  }

  return null;
};

const toStoryCardData = (
  meta: IndexMeta,
  lang: 'pl' | 'en',
): StoryCardData | null => {
  const localizedSlug = pickLocalized(meta.slug, lang);
  const title = pickLocalized(meta.title, lang, meta.id || '');
  const description = pickLocalized(meta.shortDescription, lang, '');

  if (!localizedSlug || !title) {
    return null;
  }

  const inferredBasePath =
    inferTaleBasePath(meta) || `tales/${meta.slug?.en || meta.id || ''}`;
  const mainCover =
    meta.covers?.mainCover || `${inferredBasePath}/img/cover_1920x1080.webm`;
  const fullCover =
    meta.covers?.fullCover || `${inferredBasePath}/img/fullCover.jpg`;
  const normalizedTags = (meta.tags || [])
    .filter((tag): tag is TAG_NAME => SUPPORTED_TAGS.has(tag as TAG_NAME))
    .map(tag => ({
      name: tag,
      warning: toWarningTag(tag),
    }));

  return {
    backgroundVideoUrl: toFableDatabaseUrl(mainCover),
    backgroundPosterUrl: toFableDatabaseUrl(fullCover),
    headline: title,
    description,
    tags: normalizedTags,
    readUrl: `/${lang}/fable/${localizedSlug}?mode=slideshow`,
    audiobookUrl: `/${lang}/fable/${localizedSlug}?mode=audiobook`,
  };
};

export const useUserDesktop: UseUserDesktopType = (lang: string) => {
  const [viewportRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: false,
      align: 'start',
      loop: true,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [storyCards, setStoryCards] = useState<StoryCardData[]>([]);

  useEffect(() => {
    const loadFables = async (): Promise<void> => {
      const locale = lang === 'pl' ? 'pl' : 'en';

      try {
        const response = await fetch('/fable-database/index.json');
        if (!response.ok) {
          setStoryCards([]);
          return;
        }

        const payload = (await response.json()) as IndexResponse;
        const cards = (payload.tales || [])
          .map(item => toStoryCardData(item.meta || {}, locale))
          .filter((item): item is StoryCardData => item !== null)
          .slice(0, 2);

        setStoryCards(cards);
      } catch {
        setStoryCards([]);
      }
    };

    void loadFables();
  }, [lang]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSlideCount(emblaApi.slideNodes().length);
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      setSlideCount(emblaApi.slideNodes().length);
      onSelect();
    });
  }, [emblaApi, onSelect, storyCards.length]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return {
    viewportRef,
    selectedIndex,
    slideCount,
    scrollTo,
    storyCards,
  };
};

export default useUserDesktop;
