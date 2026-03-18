import type { UseSearchResults as UseSearchResultsType } from './SearchResults.types';

export const useSearchResults: UseSearchResultsType = (
  selectedItem,
  selectedBooks,
  noSelectedItemLabel,
) => ({
  selectedName: selectedItem?.label ?? noSelectedItemLabel,
  hasBooks: selectedBooks.length > 0,
});
