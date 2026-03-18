import type { ReactElement } from 'react';

import type {
  CatalogueBook,
  CatalogueListItem,
} from '@/components/templates/CataloguePage/CataloguePage.types';

/**
 * @module
 * This file defines the types and interfaces for the SearchResults organism.
 */

/**
 * Props for SearchResults component.
 *
 * @property selectedItem - Currently selected item from title/author list.
 * @property selectedBooks - Books that should be displayed as covers.
 */
export interface SearchResultsProps {
  selectedItem: CatalogueListItem | null;
  selectedBooks: CatalogueBook[];
  title: string;
  noSelectedItemLabel: string;
  emptyStateLabel: string;
}

/**
 * Return values for useSearchResults hook.
 *
 * @property selectedName - Name shown under result heading.
 * @property hasBooks - Indicates whether there are books to render.
 */
export interface UseSearchResultsReturnValues {
  selectedName: string;
  hasBooks: boolean;
}

/**
 * Hook used by SearchResults to normalize view state.
 *
 * @param selectedItem - Active selected catalogue item.
 * @param selectedBooks - Active selected books list.
 */
export type UseSearchResults = (
  selectedItem: CatalogueListItem | null,
  selectedBooks: CatalogueBook[],
  noSelectedItemLabel: string,
) => UseSearchResultsReturnValues;

/**
 * Component renders selected search results section with covers.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SearchResults selectedItem={item} selectedBooks={books} />
 * ```
 */
export type SearchResults = (props: SearchResultsProps) => ReactElement;
