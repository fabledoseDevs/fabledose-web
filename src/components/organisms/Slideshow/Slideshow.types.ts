import type { ReactElement, RefObject } from 'react';

import type {
  FableFontFamily,
  Settings,
} from '@/contexts/SettingsContext.types';
import type { FableData } from '@/fables/fables.types';
import type { SLIDE_TEXT_POSITION } from '@/molecules/SingleSlide';

/**
 * @module
 * Types and interfaces for the Slideshow organism component.
 */

/**
 * Delivery quality used by StoryPage to enforce account limits.
 */
export type SlideshowQuality = 'high' | 'low';

/**
 * Interface for Slideshow component props.
 *
 * @property fable - Fully resolved fable payload with localized slides.
 * @property settings - Current user display settings from SettingsContext.
 * @property quality - Effective quality level after account restrictions.
 * @property onGoBack - Callback for the top-left "go back" button.
 * @property onSlideChange - Optional callback fired when slide changes, receives current slide index.
 * @property onCompleted - Optional callback fired when user completes the story (reaches last slide).
 * @property initialSlide - Optional initial slide index to start from.
 */
export interface SlideshowProps {
  fable: FableData;
  settings: Settings | null;
  quality: SlideshowQuality;
  onGoBack: () => void;
  onSlideChange?: (slideIndex: number) => void;
  onCompleted?: () => void;
  initialSlide?: number;
}

/**
 * Return values for Slideshow hook-like internal state.
 *
 * @property viewportRef - Ref callback used to mount Embla viewport.
 * @property selectedIndex - Active slide index.
 * @property canScrollPrev - If true, previous navigation is available.
 * @property canScrollNext - If true, next navigation is available.
 * @property controlsVisible - Whether overlay control buttons are visible.
 * @property isFullscreen - Whether slideshow root is currently fullscreen.
 */
export interface SlideshowState {
  viewportRef: (node: HTMLElement | null) => void;
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  controlsVisible: boolean;
  isFullscreen: boolean;
}

/**
 * Prepared presentation model for one slide.
 *
 * @property id - Stable key for rendered slide item.
 * @property shouldRenderSlide - If true, full slide content should be mounted.
 * @property isActive - If true, marks the currently selected slide.
 * @property paragraphs - Filtered non-empty paragraphs for text block.
 * @property textPosition - Final text position enum for SingleSlide component.
 * @property mediaUrl - Resolved public media URL for selected quality profile.
 * @property staticImageUrl - Resolved static fallback image URL.
 */
export interface SlideshowSlideModel {
  id: string;
  shouldRenderSlide: boolean;
  isActive: boolean;
  paragraphs: string[];
  textPosition: SLIDE_TEXT_POSITION;
  mediaUrl: string;
  staticImageUrl: string;
}

/**
 * Interface for Slideshow hook props.
 *
 * @property fable - Fully resolved fable payload with localized slides.
 * @property settings - Current user display settings from SettingsContext.
 * @property quality - Effective quality level after account restrictions.
 * @property onSlideChange - Optional callback fired when slide changes, receives current slide index.
 * @property onCompleted - Optional callback fired when user completes the story (reaches last slide).
 * @property initialSlide - Optional initial slide index to start from.
 */
export interface UseSlideshowProps {
  fable: FableData;
  settings: Settings | null;
  quality: SlideshowQuality;
  onSlideChange?: (slideIndex: number) => void;
  onCompleted?: () => void;
  initialSlide?: number;
}

/**
 * Interface for useSlideshow hook return values.
 *
 * @property slideshowRef - Root slideshow element ref used for fullscreen mode.
 * @property viewportRef - Ref callback attached to Embla viewport.
 * @property controlsVisible - Whether overlay control buttons are visible.
 * @property canScrollPrev - If true, previous navigation is available.
 * @property canScrollNext - If true, next navigation is available.
 * @property isFullscreen - Whether slideshow root is currently fullscreen.
 * @property slides - Prepared slide models used by the view component.
 * @property textBackground - Text panel style: none, light or dark.
 * @property backgroundIntensity - Intensity value in range 0-100.
 * @property fontSize - Font size in pixels.
 * @property fontFamily - Selected reader font family identifier.
 * @property animationQualityValue - Selected animation quality normalized for modal controls.
 * @property useAnimatedBackground - If true, animated media is used.
 * @property isSettingsModalOpen - Controls slideshow settings modal visibility.
 * @property handleRevealControls - Handler for mouse/touch interaction.
 * @property handleScrollPrev - Handler for previous-slide action.
 * @property handleScrollNext - Handler for next-slide action.
 * @property handleToggleFullscreen - Handler for fullscreen toggle action.
 * @property handleOpenSettingsModal - Handler for opening slideshow settings modal.
 * @property handleCloseSettingsModal - Handler for closing slideshow settings modal.
 * @property handleFontSizeChange - Handler for font size setting updates.
 * @property handleFontFamilyChange - Handler for font family setting updates.
 * @property handleTextBackgroundChange - Handler for text background setting updates.
 * @property handleBackgroundIntensityChange - Handler for background intensity setting updates.
 * @property handleIllustrationAnimationChange - Handler for animation on/off setting updates.
 * @property handleAnimationQualityChange - Handler for animation quality setting updates.
 */
export interface UseSlideshowReturn {
  slideshowRef: RefObject<HTMLElement | null>;
  viewportRef: (node: HTMLElement | null) => void;
  controlsVisible: boolean;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  isFullscreen: boolean;
  slides: SlideshowSlideModel[];
  textBackground: string;
  backgroundIntensity: number;
  fontSize: number;
  fontFamily: FableFontFamily;
  animationQualityValue: string;
  useAnimatedBackground: boolean;
  isSettingsModalOpen: boolean;
  handleRevealControls: () => void;
  handleScrollPrev: () => void;
  handleScrollNext: () => void;
  handleToggleFullscreen: () => Promise<void>;
  handleOpenSettingsModal: () => void;
  handleCloseSettingsModal: () => void;
  handleFontSizeChange: (value: number) => void;
  handleFontFamilyChange: (value: string) => void;
  handleTextBackgroundChange: (value: string) => void;
  handleBackgroundIntensityChange: (value: number) => void;
  handleIllustrationAnimationChange: (value: boolean) => void;
  handleAnimationQualityChange: (value: string) => void;
}

/**
 * Hook type for slideshow state, controls and keyboard navigation.
 */
export type UseSlideshow = (props: UseSlideshowProps) => UseSlideshowReturn;

/**
 * Component renders fullscreen slideshow experience based on Embla carousel.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Slideshow
 *   fable={fable}
 *   settings={settings}
 *   quality="high"
 *   onGoBack={() => router.push('/en/fable/goldilocks')}
 * />
 * ```
 */
export type Slideshow = (props: SlideshowProps) => ReactElement;
