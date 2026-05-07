import type { ReactElement } from 'react';

import type { FableFontFamily } from '@/contexts/SettingsContext.types';

/**
 * @module
 * Types and interfaces for the SingleSlide molecule component.
 */

/**
 * Supported text block placement variants for slideshow slides.
 */
export enum SLIDE_TEXT_POSITION {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  MIDDLE_LEFT = 'middle-left',
  MIDDLE_RIGHT = 'middle-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',
}

/**
 * Interface for SingleSlide component props.
 *
 * @property paragraphs - Slide text paragraphs to render.
 * @property textPosition - Text block position preset.
 * @property mediaUrl - Absolute or root-relative media URL.
 * @property staticImageUrl - Static image URL used when animations are disabled.
 * @property textBackground - Text panel style: none, light or dark.
 * @property backgroundIntensity - Intensity value in range 0-100.
 * @property fontSize - Font size in pixels.
 * @property fontFamily - Selected reader font family identifier.
 * @property useAnimatedBackground - If true, mediaUrl is treated as animated WEBM.
 * @property isActive - Controls subtle opacity emphasis for active slide.
 */
export interface SingleSlideProps {
  paragraphs: string[];
  textPosition: SLIDE_TEXT_POSITION;
  mediaUrl: string;
  staticImageUrl?: string;
  textBackground: string;
  backgroundIntensity: number;
  fontSize: number;
  fontFamily: FableFontFamily;
  useAnimatedBackground: boolean;
  isActive: boolean;
}

/**
 * Interface for SingleSlide hook props.
 *
 * @property paragraphs - Slide text paragraphs to render.
 * @property mediaUrl - Absolute or root-relative media URL.
 * @property staticImageUrl - Static image URL used when animations are disabled.
 */
export interface UseSingleSlideProps {
  paragraphs: string[];
  mediaUrl: string;
  staticImageUrl?: string;
  textBackground: string;
}

/**
 * Interface for useSingleSlide hook return value.
 *
 * @property paragraphEntries - Paragraphs with stable display keys.
 * @property resolvedStaticImageUrl - Final static background URL fallback.
 * @property resolvedTextTone - Effective text tone mapped from text background setting.
 */
export interface UseSingleSlideReturn {
  paragraphEntries: { id: string; text: string }[];
  resolvedStaticImageUrl: string;
  resolvedTextTone: 'light' | 'dark';
}

/**
 * Hook type for preparing SingleSlide display data.
 */
export type UseSingleSlide = (
  props: UseSingleSlideProps,
) => UseSingleSlideReturn;

/**
 * Component renders one fullscreen slide with media background and text block.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SingleSlide
 *   paragraphs={['Once upon a time...']}
 *   textPosition={SLIDE_TEXT_POSITION.BOTTOM_CENTER}
 *   mediaUrl="/fable-database/tales/goldilocks/img/cover_1920x1080.webm"
 *   textBackground="dark"
 *   backgroundIntensity={50}
 *   fontSize={18}
 *   fontFamily="sans"
 *   useAnimatedBackground
 *   isActive
 * />
 * ```
 */
export type SingleSlide = (props: SingleSlideProps) => ReactElement;
