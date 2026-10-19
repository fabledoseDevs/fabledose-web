import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  libraryFables,
  normalizeLocale,
  toFableTile,
  toStoryCardData,
} from '@/fables/fables.library';

import type { UseUserDesktop as UseUserDesktopType } from './UserDesktop.types';

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
  const locale = normalizeLocale(lang);
  const storyCards = useMemo(
    () => libraryFables.map(meta => toStoryCardData(meta, locale)),
    [locale],
  );
  const tiles = useMemo(
    () => libraryFables.map(meta => toFableTile(meta, locale)),
    [locale],
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
