import type { ReactElement } from 'react';

import type { DictionaryType } from '@/lang/lang.types';

/**
 * @module
 * This file defines the types and interfaces for the TopBar component.
 */

/**
 * Interface for TopBar component props.
 * @property dict - Dictionary object containing translations for the TopBar.
 */
export interface TopBarProps {
  dict: DictionaryType['common'];
}

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
export type TopBar = (props: TopBarProps) => ReactElement;
