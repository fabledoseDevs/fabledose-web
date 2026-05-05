import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useSettings } from '@/contexts/SettingsContext';
import { SLIDE_TEXT_POSITION } from '@/molecules/SingleSlide';

import type { UseSlideshow as UseSlideshowType } from './Slideshow.types';

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

const resolveTextPosition = (layout: string): SLIDE_TEXT_POSITION => {
  const normalizedLayout = layout
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-');

  if (normalizedLayout === 'top-left') {
    return SLIDE_TEXT_POSITION.TOP_LEFT;
  }

  if (normalizedLayout === 'top-center') {
    return SLIDE_TEXT_POSITION.TOP_CENTER;
  }

  if (normalizedLayout === 'top-right') {
    return SLIDE_TEXT_POSITION.TOP_RIGHT;
  }

  if (normalizedLayout === 'middle-left') {
    return SLIDE_TEXT_POSITION.MIDDLE_LEFT;
  }

  if (normalizedLayout === 'middle-right') {
    return SLIDE_TEXT_POSITION.MIDDLE_RIGHT;
  }

  if (normalizedLayout === 'bottom-left') {
    return SLIDE_TEXT_POSITION.BOTTOM_LEFT;
  }

  if (normalizedLayout === 'bottom-right') {
    return SLIDE_TEXT_POSITION.BOTTOM_RIGHT;
  }

  return SLIDE_TEXT_POSITION.BOTTOM_CENTER;
};

const toStaticImageFromVideo = (videoUrl: string): string => {
  const match = videoUrl.match(
    /\/img\/(cover|img_\d+)_(?:1920x1080|1280x720)\.webm$/,
  );

  if (!match) {
    return '';
  }

  return videoUrl.replace(
    /\/img\/(cover|img_\d+)_(?:1920x1080|1280x720)\.webm$/,
    '/img/backups/$1.jpg',
  );
};

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  const tagName = target.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || tagName === 'select';
};

export const useSlideshow: UseSlideshowType = ({
  fable,
  settings,
  quality,
}) => {
  const { updateSettings } = useSettings();
  const [viewportRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: false,
      align: 'start',
      loop: false,
      slidesToScroll: 1,
      skipSnaps: false,
    },
    [Fade()],
  );
  const slideshowRef = useRef<HTMLElement | null>(null);
  const controlsTimerRef = useRef<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(true);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const textBackground = settings?.textBackground || 'none';
  const backgroundIntensity = settings?.backgroundIntensity || 50;
  const fontSize = settings?.fontSize || 16;
  const fontFamily = settings?.fontFamily || 'sans';
  const useAnimatedBackground = settings?.illustrationAnimation ?? true;
  const userAnimationQuality = settings?.animationQuality || 'auto';
  const animationQualityValue =
    userAnimationQuality === 'high' ? 'hd' : userAnimationQuality;

  useEffect(() => {
    const handleResize = () => {
      setIsCompactViewport(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const mediaProfile = useMemo<'desktop' | 'mobile'>(() => {
    if (quality === 'low' || userAnimationQuality === 'sd') {
      return 'mobile';
    }

    if (userAnimationQuality === 'auto') {
      return isCompactViewport ? 'mobile' : 'desktop';
    }

    return 'desktop';
  }, [quality, userAnimationQuality, isCompactViewport]);

  const syncEmblaState = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    syncEmblaState();
    emblaApi.on('select', syncEmblaState);
    emblaApi.on('reInit', syncEmblaState);
  }, [emblaApi, syncEmblaState]);

  const handleRevealControls = useCallback(() => {
    setControlsVisible(true);

    if (controlsTimerRef.current) {
      window.clearTimeout(controlsTimerRef.current);
    }

    controlsTimerRef.current = window.setTimeout(() => {
      setControlsVisible(false);
    }, 1700);
  }, []);

  useEffect(
    () => () => {
      if (controlsTimerRef.current) {
        window.clearTimeout(controlsTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleScrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const handleScrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const handleToggleFullscreen = useCallback(async () => {
    if (!slideshowRef.current) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await slideshowRef.current.requestFullscreen();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.metaKey ||
        event.ctrlKey ||
        isSettingsModalOpen ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        handleRevealControls();
        handleScrollPrev();
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        handleRevealControls();
        handleScrollNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleRevealControls,
    handleScrollNext,
    handleScrollPrev,
    isSettingsModalOpen,
  ]);

  const handleOpenSettingsModal = useCallback(() => {
    handleRevealControls();
    setIsSettingsModalOpen(true);
  }, [handleRevealControls]);

  const handleCloseSettingsModal = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, []);

  const handleFontSizeChange = useCallback(
    (value: number) => {
      updateSettings({ fontSize: value });
    },
    [updateSettings],
  );

  const handleFontFamilyChange = useCallback(
    (value: string) => {
      updateSettings({ fontFamily: value });
    },
    [updateSettings],
  );

  const handleTextBackgroundChange = useCallback(
    (value: string) => {
      updateSettings({ textBackground: value });
    },
    [updateSettings],
  );

  const handleBackgroundIntensityChange = useCallback(
    (value: number) => {
      updateSettings({ backgroundIntensity: value });
    },
    [updateSettings],
  );

  const handleIllustrationAnimationChange = useCallback(
    (value: boolean) => {
      updateSettings({ illustrationAnimation: value });
    },
    [updateSettings],
  );

  const handleAnimationQualityChange = useCallback(
    (value: string) => {
      updateSettings({ animationQuality: value });
    },
    [updateSettings],
  );

  const fallbackStaticCover = toPublicUrl(
    fable.meta.covers.fullCover || fable.meta.covers.tileCover || '',
  );

  const slides = useMemo(
    () =>
      fable.content.text.slides.map((slide, slideIndex) => {
        const mediaUrl = toPublicUrl(slide.backgroundImage[mediaProfile] || '');

        return {
          id: `story-slide-${slideIndex}`,
          shouldRenderSlide: Math.abs(slideIndex - selectedIndex) <= 1,
          isActive: slideIndex === selectedIndex,
          paragraphs: slide.paragraphs.filter(paragraph => paragraph.trim()),
          textPosition: resolveTextPosition(slide.layout || 'default'),
          mediaUrl,
          staticImageUrl:
            toStaticImageFromVideo(mediaUrl) || fallbackStaticCover,
        };
      }),
    [
      fallbackStaticCover,
      fable.content.text.slides,
      mediaProfile,
      selectedIndex,
    ],
  );

  return {
    slideshowRef,
    viewportRef,
    controlsVisible,
    canScrollPrev,
    canScrollNext,
    isFullscreen,
    slides,
    textBackground,
    backgroundIntensity,
    fontSize,
    fontFamily,
    animationQualityValue,
    useAnimatedBackground,
    isSettingsModalOpen,
    handleRevealControls,
    handleScrollPrev,
    handleScrollNext,
    handleToggleFullscreen,
    handleOpenSettingsModal,
    handleCloseSettingsModal,
    handleFontSizeChange,
    handleFontFamilyChange,
    handleTextBackgroundChange,
    handleBackgroundIntensityChange,
    handleIllustrationAnimationChange,
    handleAnimationQualityChange,
  };
};
