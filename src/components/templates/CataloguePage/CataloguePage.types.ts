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
 * @property cover - Resolved cover image URL from the shared fable index.
 * @property storyUrl - Locale-prefixed link to the fable introduction.
 */
export interface CatalogueBook {
  id: string;
  title: string;
  description: string;
  cover: string;
  storyUrl: string;
}

/**
 * Author record grouping indexed fables for catalogue search.
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
 * @property selectedItem - Selected item resolved by stable ID in the current locale, or the first matching item; null when no results match.
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
 * Maps the shared fable index to unique title and author lists and filters them by query.
 * Fables with multiple authors appear once in the title list and under each credited author.
 * Fables without an author remain searchable by title.
 *
 * @param lang - Requested locale for labels, links, and locale-aware sorting.
 * @returns Search state and localized catalogue results.
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

/**
 * Catalogue lists derived from the shared fable metadata.
 *
 * @property titles - One item per fable, including entries without author credits.
 * @property authors - One item per distinct author, with their associated fables.
 */
export interface CatalogueItems {
  titles: CatalogueListItem[];
  authors: CatalogueListItem[];
}
