import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the UserDesktop template component.
 */

/**
 * Component renders the main User Desktop view.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <UserDesktop />
 * ```
 */
export type UserDesktop = () => ReactElement;

/**
 * Return values for the UserDesktop hook (Embla integration).
 *
 * @property viewportRef - Ref callback attached to the Embla viewport element to initialize the carousel.
 * @property selectedIndex - Index of the currently selected slide.
 * @property slideCount - Number of slides available.
 * @property scrollTo - Programmatically scrolls to the provided slide index.
 */
export interface UseUserDesktopReturnValues {
  viewportRef: (node: HTMLElement | null) => void;
  selectedIndex: number;
  slideCount: number;
  scrollTo: (index: number) => void;
}

/**
 * Hook used by UserDesktop to integrate with Embla carousel and control pagination.
 */
export type UseUserDesktop = () => UseUserDesktopReturnValues;
