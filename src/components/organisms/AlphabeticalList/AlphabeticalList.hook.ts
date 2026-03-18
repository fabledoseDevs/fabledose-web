import { useMemo } from 'react';

import type {
  AlphabeticalListGroup,
  UseAlphabeticalList as UseAlphabeticalListType,
} from './AlphabeticalList.types';

const getItemLetter = (value: string): string => {
  const firstChar = value.trim().charAt(0).toLocaleUpperCase('pl-PL');
  return /^[A-ZĄĆĘŁŃÓŚŹŻ]$/i.test(firstChar) ? firstChar : '#';
};

export const useAlphabeticalList: UseAlphabeticalListType = items => {
  const groupedItems = useMemo<AlphabeticalListGroup[]>(() => {
    const sortedItems = [...items].sort((a, b) =>
      a.label.localeCompare(b.label, 'pl', { sensitivity: 'base' }),
    );

    const groupsMap = sortedItems.reduce<Map<string, typeof sortedItems>>(
      (map, item) => {
        const letter = getItemLetter(item.label);
        const currentBucket = map.get(letter) ?? [];
        map.set(letter, [...currentBucket, item]);
        return map;
      },
      new Map<string, typeof sortedItems>(),
    );

    return Array.from(groupsMap.entries())
      .sort(([left], [right]) =>
        left.localeCompare(right, 'pl', { sensitivity: 'base' }),
      )
      .map(([letter, grouped]) => ({
        letter,
        items: grouped,
      }));
  }, [items]);

  return { groupedItems };
};
