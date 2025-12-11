import type { ReactElement, ReactNode } from 'react';

import type { DictionaryType } from './dictionaries/lang.types';

/**
 * @module
 * This file defines the types and interfaces for the DictionaryProvider.
 */

/**
 * Interface for DictionaryProvider component properties.
 *
 * @property dictionary - The dictionary object containing all translations.
 * @property children - The child components that will be wrapped by the provider.
 */
export interface DictionaryProviderProps {
  dictionary: DictionaryType;
  children: ReactNode;
}

/**
 * Component provides the dictionary context to the application.
 * It wraps the application (or a subtree) to make translations accessible via the `useDictionary` hook.
 *
 * @param props - The component properties:
 *  - `dictionary`: The dictionary object containing translations.
 *  - `children`: The child components.
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <DictionaryProvider dictionary={enDictionary}>
 *   <Component />
 * </DictionaryProvider>
 * ```
 */
export type DictionaryProvider = (
  props: DictionaryProviderProps,
) => ReactElement;

/**
 * Hook to retrieve the current dictionary from the context.
 * Use this hook in any Client Component to access translations without prop drilling.
 *
 * @returns The dictionary object containing all translations.
 *
 * @throws Will throw an error if used outside of a `DictionaryProvider`.
 *
 * @example
 * ```tsx
 * const { common } = useDictionary();
 * return <button>{common.login}</button>;
 * ```
 */
export type UseDictionary = () => DictionaryType;
