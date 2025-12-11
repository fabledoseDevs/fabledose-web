import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the TopBar component.
 */

/**
 * Interface for the return value of useTopBarScroll hook.
 *
 * @property isTransparent - Boolean indicating whether the TopBar should be transparent.
 */
export interface UseTopBarScrollReturnValues {
  isTransparent: boolean;
}

/**
 * Hook to handle the scroll logic for the TopBar component.
 * It tracks whether the TopBar should be transparent based on the scroll position.
 *
 * @returns Object containing the isTransparent state.
 *
 * @example
 * ```tsx
 * const { isTransparent } = useTopBarScroll();
 * ```
 */
export type UseTopBarScroll = () => UseTopBarScrollReturnValues;

/**
 * TopBar component displays the fixed bar with logo, language dropdown and log in buton.
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <TopBar />
 * ```
 */
export type TopBar = () => ReactElement;
