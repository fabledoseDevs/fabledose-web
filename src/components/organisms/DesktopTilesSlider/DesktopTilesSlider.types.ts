import type { ReactElement } from 'react';

import type { FableTileProps } from '@/molecules/FableTile/FableTile.types';

/**
 * @module
 * This file defines the types and interfaces for the DesktopTilesSlider component.
 *
 * The DesktopTilesSlider renders a header with a title and navigation arrows
 * and a horizontal slider (Embla) with a row of FableTile elements.
 */

/**
 * Interface for DesktopTilesSlider component props.
 *
 * @property title - Slider section title displayed above the tiles.
 * @property tiles - Array of fable tiles to render inside the slider.
 */
export interface DesktopTilesSliderProps {
  title: string;
  tiles: FableTileProps[];
}

/**
 * Return values for the DesktopTilesSlider hook.
 *
 * @property viewportRef - Ref callback attached to the Embla viewport element to initialize the carousel.
 * @property scrollPrev - Programmatically scrolls the carousel to the previous slide.
 * @property scrollNext - Programmatically scrolls the carousel to the next slide.
 * @property canScrollPrev - Indicates if the carousel can scroll to the previous slide.
 * @property canScrollNext - Indicates if the carousel can scroll to the next slide.
 */
export interface UseDesktopTilesSliderReturnValues {
  viewportRef: (node: HTMLElement | null) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

/**
 * Hook used by DesktopTilesSlider to integrate with Embla carousel and control navigation.
 */
export type UseDesktopTilesSlider = () => UseDesktopTilesSliderReturnValues;

/**
 * Component renders a DesktopTilesSlider.
 * Displays the section header (title and navigation arrows) and a horizontal
 * scrollable list of {@link FableTileProps | FableTile} slides.
 *
 * @param props - The component properties:
 *  - `title`: Slider section title displayed above the tiles.
 *  - `tiles`: Array of fable tiles to render inside the slider.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <DesktopTilesSlider
 *   title="Polecane bajki"
 *   tiles={[
 *     {
 *       imageUrl: '/img/cover.jpg',
 *       fableTitle: 'Złotowłosa',
 *       fableId: 'zlotowlosa-i-trzy-misie-1',
 *       fableDescription: 'Krótki opis bajki…',
 *     },
 *   ]}
 * />
 * ```
 */
export type DesktopTilesSlider = (
  props: DesktopTilesSliderProps,
) => ReactElement;
