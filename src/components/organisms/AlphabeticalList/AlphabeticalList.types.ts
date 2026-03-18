import type { ReactElement } from 'react';

import type { CatalogueListItem } from '@/components/templates/CataloguePage/CataloguePage.types';

/**
 * @module
 * This file defines the types and interfaces for the AlphabeticalList organism.
 */

/**
 * Group of items represented by first letter.
 *
 * @property letter - Group headline letter.
 * @property items - Items belonging to the group.
 */
export interface AlphabeticalListGroup {
  letter: string;
  items: CatalogueListItem[];
}

/**
 * Props for AlphabeticalList component.
 *
 * @property title - Column title shown above list.
 * @property items - List items to render (component sorts internally on prop change).
 * @property selectedItemId - Optional selected item id for active state styling.
 * @property onSelectItem - Callback fired after item click.
 */
export interface AlphabeticalListProps {
  title: string;
  items: CatalogueListItem[];
  selectedItemId?: string;
  emptyStateLabel: string;
  onSelectItem: (item: CatalogueListItem) => void;
}

/**
 * Return values for useAlphabeticalList hook.
 *
 * @property groupedItems - Sorted and grouped items by first letter.
 */
export interface UseAlphabeticalListReturnValues {
  groupedItems: AlphabeticalListGroup[];
}

/**
 * Hook used by AlphabeticalList to sort and group list data.
 *
 * @param items - List data passed to component.
 */
export type UseAlphabeticalList = (
  items: CatalogueListItem[],
) => UseAlphabeticalListReturnValues;

/**
 * Component renders a scrollable alphabetical list.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <AlphabeticalList title="Autorzy" items={items} onSelectItem={onSelect} />
 * ```
 */
export type AlphabeticalList = (props: AlphabeticalListProps) => ReactElement;
