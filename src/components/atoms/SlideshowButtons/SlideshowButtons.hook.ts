import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowUturnLeftIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

import {
  type UseSlideshowButtons as UseSlideshowButtonsType,
  SLIDESHOW_BUTTON_VARIANT,
} from './SlideshowButtons.types';

const getDefaultAriaLabel = (
  variant: SLIDESHOW_BUTTON_VARIANT,
  isFullscreen: boolean,
): string => {
  if (variant === SLIDESHOW_BUTTON_VARIANT.NEXT_SLIDE) {
    return 'Next slide';
  }

  if (variant === SLIDESHOW_BUTTON_VARIANT.PREVIOUS_SLIDE) {
    return 'Previous slide';
  }

  if (variant === SLIDESHOW_BUTTON_VARIANT.GO_BACK) {
    return 'Go back';
  }

  if (variant === SLIDESHOW_BUTTON_VARIANT.FULLSCREEN) {
    return isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen';
  }

  return 'Options';
};

const getButtonIcon = (
  variant: SLIDESHOW_BUTTON_VARIANT,
  isFullscreen: boolean,
) => {
  if (variant === SLIDESHOW_BUTTON_VARIANT.NEXT_SLIDE) {
    return ArrowRightIcon;
  }

  if (variant === SLIDESHOW_BUTTON_VARIANT.PREVIOUS_SLIDE) {
    return ArrowLeftIcon;
  }

  if (variant === SLIDESHOW_BUTTON_VARIANT.GO_BACK) {
    return ArrowUturnLeftIcon;
  }

  if (variant === SLIDESHOW_BUTTON_VARIANT.FULLSCREEN) {
    return isFullscreen ? ArrowsPointingInIcon : ArrowsPointingOutIcon;
  }

  return Cog6ToothIcon;
};

export const useSlideshowButtons: UseSlideshowButtonsType = ({
  variant,
  isFullscreen,
  ariaLabel,
}) => ({
  resolvedAriaLabel: ariaLabel || getDefaultAriaLabel(variant, isFullscreen),
  Icon: getButtonIcon(variant, isFullscreen),
});
