import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR as HEADLINE_FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import { FOREGROUND_COLOR as PARAGRAPH_FOREGROUND_COLOR } from '@/atoms/Paragraph/Paragraph.types';
import FableTile from '@/molecules/FableTile';

import { useSearchResults } from './SearchResults.hook';
import {
  EmptyState,
  ResultTilesList,
  SearchResultsBody,
} from './SearchResults.styled';
import type { SearchResults as SearchResultsType } from './SearchResults.types';

export const SearchResults: SearchResultsType = ({
  selectedItem,
  selectedBooks,
  title,
  noSelectedItemLabel,
  emptyStateLabel,
}) => {
  const { selectedName, hasBooks } = useSearchResults(
    selectedItem,
    selectedBooks,
    noSelectedItemLabel,
  );

  return (
    <SearchResultsBody>
      <Headline
        weight={HEADLINE_TYPE.SMALL}
        color={HEADLINE_FOREGROUND_COLOR.WHITE}
      >
        {title}
      </Headline>
      <Headline
        weight={HEADLINE_TYPE.SMALL}
        color={HEADLINE_FOREGROUND_COLOR.WHITE}
      >
        {selectedName}
      </Headline>

      {!hasBooks && (
        <EmptyState>
          <Paragraph color={PARAGRAPH_FOREGROUND_COLOR.WHITE}>
            {emptyStateLabel}
          </Paragraph>
        </EmptyState>
      )}

      <ResultTilesList>
        {selectedBooks.map(book => (
          <FableTile
            key={book.id}
            imageUrl={book.cover}
            fableTitle={book.title}
            fableDescription={book.description}
            fableUrl={book.storyUrl}
          />
        ))}
      </ResultTilesList>
    </SearchResultsBody>
  );
};
