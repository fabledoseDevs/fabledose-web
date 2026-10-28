import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  libraryFables,
  normalizeLocale,
  toFableTile,
  toStoryCardData,
} from '@/fables/fables.library';
import { useChildAccess } from '@/hooks/useChildAccess';

import type { UseUserDesktop as UseUserDesktopType } from './UserDesktop.types';

export const useUserDesktop: UseUserDesktopType = (lang: string) => {
  const { canDiscover } = useChildAccess();
  const visibleFables = useMemo(
    () => libraryFables.filter(meta => canDiscover(meta.id)),
    [canDiscover],
  );
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
  const locale = normalizeLocale(lang);
  const storyCards = useMemo(
    () => visibleFables.map(meta => toStoryCardData(meta, locale)),
    [locale, visibleFables],
  );
  const tiles = useMemo(
    () => visibleFables.map(meta => toFableTile(meta, locale)),
    [locale, visibleFables],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSlideCount(emblaApi.slideNodes().length);
    onSelect();
    emblaApi.on('select', onSelect);
    const handleReInit = () => {
      setSlideCount(emblaApi.slideNodes().length);
      onSelect();
    };
    emblaApi.on('reInit', handleReInit);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', handleReInit);
    };
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
    tiles,
  };
};

export default useUserDesktop;
