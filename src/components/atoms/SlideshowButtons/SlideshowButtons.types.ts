import type { ReactElement } from 'react';
import type { ComponentType } from 'react';

/**
 * @module
 * Types and interfaces for the SlideshowButtons atom component.
 */

/**
 * Supported visual variants for slideshow action buttons.
 */
export enum SLIDESHOW_BUTTON_VARIANT {
  NEXT_SLIDE = 'next-slide',
  PREVIOUS_SLIDE = 'previous-slide',
  GO_BACK = 'go-back',
  FULLSCREEN = 'fullscreen',
  OPTIONS = 'options',
}

/**
 * Interface for SlideshowButtons component props.
 *
 * @property variant - Defines which icon and semantic action the button represents.
 * @property onClick - Callback fired when the button is clicked.
 * @property isVisible - Controls button opacity state (hidden vs visible).
 * @property disabled - If true, button becomes non-interactive.
 * @property isFullscreen - Fullscreen state used only by FULLSCREEN variant to toggle icon.
 * @property ariaLabel - Optional custom accessible label.
 */
export interface SlideshowButtonsProps {
  variant: SLIDESHOW_BUTTON_VARIANT;
  onClick: () => void;
  isVisible?: boolean;
  disabled?: boolean;
  isFullscreen?: boolean;
  ariaLabel?: string;
}

/**
 * Interface for SlideshowButtons hook props.
 *
 * @property variant - Defines which icon and semantic action the button represents.
 * @property isFullscreen - Fullscreen state used only by FULLSCREEN variant to toggle icon.
 * @property ariaLabel - Optional custom accessible label.
 */
export interface UseSlideshowButtonsProps {
  variant: SLIDESHOW_BUTTON_VARIANT;
  isFullscreen: boolean;
  ariaLabel?: string;
}

/**
 * Interface for useSlideshowButtons hook return value.
 *
 * @property resolvedAriaLabel - Final aria-label for the button.
 * @property Icon - Heroicon component selected for current variant/state.
 */
export interface UseSlideshowButtonsReturn {
  resolvedAriaLabel: string;
  Icon: ComponentType<{ className?: string }>;
}

/**
 * Hook type for resolving button aria-label and icon.
 */
export type UseSlideshowButtons = (
  props: UseSlideshowButtonsProps,
) => UseSlideshowButtonsReturn;

/**
 * Component renders a single circular slideshow control button.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SlideshowButtons
 *   variant={SLIDESHOW_BUTTON_VARIANT.NEXT_SLIDE}
 *   onClick={() => console.log('next')}
 *   isVisible
 * />
 * ```
 */
export type SlideshowButtons = (props: SlideshowButtonsProps) => ReactElement;
