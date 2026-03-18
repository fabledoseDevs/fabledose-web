import type { ChangeEvent, ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the CataloguePage template component.
 */

/**
 * Single book entry assigned to an author.
 *
 * @property id - Unique identifier of the book.
 * @property title - Book title displayed in title lists and cover tiles.
 * @property description - Short description displayed on tile overlay.
 * @property coverUrl - URL to the cover image.
 */
export interface CatalogueBook {
  id: string;
  title: string;
  description: string;
  cover: string;
  storyUrl: string;
}

/**
 * Author record used as source data for catalogue search.
 *
 * @property id - Unique identifier of the author.
 * @property name - Full author name.
 * @property books - Books assigned to this author.
 */
export interface CatalogueAuthor {
  id: string;
  name: string;
  books: CatalogueBook[];
}

/**
 * Selectable list item used by alphabetical list columns.
 *
 * @property id - Unique identifier of the item.
 * @property label - Display label of the item.
 * @property type - Item kind (`title` or `author`).
 * @property books - Books represented by this list item.
 * @property helperText - Optional extra text for UI context.
 */
export interface CatalogueListItem {
  id: string;
  label: string;
  type: 'title' | 'author';
  books: CatalogueBook[];
  helperText?: string;
}

/**
 * Return values for useCataloguePage hook.
 *
 * @property query - Current search query.
 * @property setQuery - Setter for search query state.
 * @property handleQueryChange - Input change handler for search field.
 * @property titleItems - Data for title alphabetical list.
 * @property authorItems - Data for author alphabetical list.
 * @property filteredTitleItems - Search-filtered titles.
 * @property filteredAuthorItems - Search-filtered authors.
 * @property selectedItem - Currently selected author/title item.
 * @property selectedBooks - Books shown inside search results panel.
 * @property selectItem - Handler for picking a list item.
 */
export interface UseCataloguePageReturnValues {
  query: string;
  setQuery: (value: string) => void;
  handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  titleItems: CatalogueListItem[];
  authorItems: CatalogueListItem[];
  filteredTitleItems: CatalogueListItem[];
  filteredAuthorItems: CatalogueListItem[];
  selectedItem: CatalogueListItem | null;
  selectedBooks: CatalogueBook[];
  selectItem: (item: CatalogueListItem) => void;
}

/**
 * Hook used by CataloguePage to handle data mapping and search interactions.
 */
export type UseCataloguePage = (lang: string) => UseCataloguePageReturnValues;

/**
 * Component renders catalogue search page.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <CataloguePage />
 * ```
 */
export type CataloguePage = () => ReactElement;
