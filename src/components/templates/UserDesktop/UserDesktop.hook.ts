import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import type { UseUserDesktop as UseUserDesktopType } from './UserDesktop.types';

export const useUserDesktop: UseUserDesktopType = () => {
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
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return { viewportRef, selectedIndex, slideCount, scrollTo };
};

export default useUserDesktop;
