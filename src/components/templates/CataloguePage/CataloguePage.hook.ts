import { useEffect, useMemo, useState } from 'react';

import {
  catalogueAuthorsMock_EN,
  catalogueAuthorsMock_PL,
} from './CataloguePage.data';
import type {
  CatalogueAuthor,
  CatalogueListItem,
  UseCataloguePage as UseCataloguePageType,
} from './CataloguePage.types';

const getLocale = (lang: string): string => (lang === 'pl' ? 'pl' : 'en');

const normalizeValue = (value: string, lang: string): string =>
  value.toLocaleLowerCase(getLocale(lang)).trim();

const createTitleItems = (authors: CatalogueAuthor[]): CatalogueListItem[] =>
  authors.flatMap(author =>
    author.books.map(book => ({
      id: `title-${book.id}`,
      label: book.title,
      type: 'title',
      books: [book],
      helperText: author.name,
    })),
  );

const createAuthorItems = (authors: CatalogueAuthor[]): CatalogueListItem[] =>
  authors.map(author => ({
    id: `author-${author.id}`,
    label: author.name,
    type: 'author',
    books: author.books,
  }));

const sortByLabel = (
  items: CatalogueListItem[],
  lang: string,
): CatalogueListItem[] =>
  [...items].sort((a, b) =>
    a.label.localeCompare(b.label, getLocale(lang), { sensitivity: 'base' }),
  );

export const useCataloguePage: UseCataloguePageType = lang => {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<CatalogueListItem | null>(
    null,
  );

  const authorsData = useMemo(
    () => (lang === 'pl' ? catalogueAuthorsMock_PL : catalogueAuthorsMock_EN),
    [lang],
  );

  const titleItems = useMemo(
    () => sortByLabel(createTitleItems(authorsData), lang),
    [authorsData, lang],
  );
  const authorItems = useMemo(
    () => sortByLabel(createAuthorItems(authorsData), lang),
    [authorsData, lang],
  );

  const normalizedQuery = normalizeValue(query, lang);

  const filteredTitleItems = useMemo(
    () =>
      titleItems.filter(item =>
        normalizeValue(item.label, lang).includes(normalizedQuery),
      ),
    [titleItems, normalizedQuery, lang],
  );

  const filteredAuthorItems = useMemo(
    () =>
      authorItems.filter(item =>
        normalizeValue(item.label, lang).includes(normalizedQuery),
      ),
    [authorItems, normalizedQuery, lang],
  );

  const fallbackSelection = useMemo(
    () => filteredAuthorItems[0] ?? filteredTitleItems[0] ?? null,
    [filteredAuthorItems, filteredTitleItems],
  );

  useEffect(() => {
    if (!selectedItem) {
      setSelectedItem(fallbackSelection);
      return;
    }

    const stillVisibleInAuthors = filteredAuthorItems.some(
      item => item.id === selectedItem.id,
    );
    const stillVisibleInTitles = filteredTitleItems.some(
      item => item.id === selectedItem.id,
    );

    if (!stillVisibleInAuthors && !stillVisibleInTitles) {
      setSelectedItem(fallbackSelection);
    }
  }, [
    fallbackSelection,
    filteredAuthorItems,
    filteredTitleItems,
    selectedItem,
    setSelectedItem,
  ]);

  const selectedBooks = useMemo(() => {
    if (!selectedItem) return [];

    const sortedBooks = [...selectedItem.books].sort((a, b) =>
      a.title.localeCompare(b.title, getLocale(lang), { sensitivity: 'base' }),
    );

    if (!normalizedQuery) {
      return sortedBooks;
    }

    const byTitle = sortedBooks.filter(book =>
      normalizeValue(book.title, lang).includes(normalizedQuery),
    );

    return byTitle.length > 0 ? byTitle : sortedBooks;
  }, [normalizedQuery, selectedItem, lang]);

  return {
    query,
    setQuery,
    handleQueryChange: event => setQuery(event.target.value),
    titleItems,
    authorItems,
    filteredTitleItems,
    filteredAuthorItems,
    selectedItem,
    selectedBooks,
    selectItem: setSelectedItem,
  };
};
