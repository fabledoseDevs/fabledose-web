import { useMemo, useState } from 'react';

import {
  libraryFables,
  normalizeLocale,
  pickLocalized,
  toFableTile,
} from '@/fables/fables.library';

import type {
  CatalogueItems,
  CatalogueListItem,
  UseCataloguePage as UseCataloguePageType,
} from './CataloguePage.types';

const getLocale = (lang: string): string => (lang === 'pl' ? 'pl' : 'en');

const normalizeValue = (value: string, lang: string): string =>
  value.toLocaleLowerCase(getLocale(lang)).trim();

const createCatalogueItems = (lang: string): CatalogueItems => {
  const locale = normalizeLocale(lang);
  const authors = new Map<string, CatalogueListItem>();
  const titles: CatalogueListItem[] = libraryFables.map(meta => {
    const tile = toFableTile(meta, locale);
    const book = {
      id: meta.id,
      title: tile.fableTitle,
      description: tile.fableDescription,
      cover: tile.imageUrl,
      storyUrl: tile.fableUrl,
    };
    for (const name of new Set(
      meta.credits.authors.map(author => author.trim()).filter(Boolean),
    )) {
      const entry = authors.get(name) || {
        id: `author-${name}`,
        label: name,
        type: 'author' as const,
        books: [],
      };
      entry.books.push(book);
      authors.set(name, entry);
    }
    return {
      id: `title-${meta.id}`,
      label: pickLocalized(meta.title, locale, meta.id),
      type: 'title',
      books: [book],
      helperText: meta.credits.authors.join(', '),
    };
  });
  return { titles, authors: [...authors.values()] };
};

const sortByLabel = (
  items: CatalogueListItem[],
  lang: string,
): CatalogueListItem[] =>
  [...items].sort((a, b) =>
    a.label.localeCompare(b.label, getLocale(lang), { sensitivity: 'base' }),
  );

export const useCataloguePage: UseCataloguePageType = lang => {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const items = useMemo(() => createCatalogueItems(lang), [lang]);
  const titleItems = useMemo(
    () => sortByLabel(items.titles, lang),
    [items, lang],
  );
  const authorItems = useMemo(
    () => sortByLabel(items.authors, lang),
    [items, lang],
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

  const selectedItem =
    [...filteredAuthorItems, ...filteredTitleItems].find(
      item => item.id === selectedId,
    ) || fallbackSelection;

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
    selectItem: item => setSelectedId(item.id),
  };
};
