import { useAlphabeticalList } from './AlphabeticalList.hook';
import {
  AlphabeticalListBody,
  ColumnTitle,
  EmptyState,
  LetterHeadline,
  LetterSection,
  ListItemButton,
  ScrollBody,
} from './AlphabeticalList.styled';
import type { AlphabeticalList as AlphabeticalListType } from './AlphabeticalList.types';

export const AlphabeticalList: AlphabeticalListType = ({
  title,
  items,
  selectedItemId,
  emptyStateLabel,
  onSelectItem,
}) => {
  const { groupedItems } = useAlphabeticalList(items);

  return (
    <AlphabeticalListBody>
      <ColumnTitle>{title}</ColumnTitle>
      <ScrollBody>
        {groupedItems.length === 0 && (
          <EmptyState>{emptyStateLabel}</EmptyState>
        )}

        {groupedItems.map(group => (
          <LetterSection key={`${title}-${group.letter}`}>
            <LetterHeadline>{group.letter}</LetterHeadline>
            {group.items.map(item => (
              <ListItemButton
                key={item.id}
                isSelected={selectedItemId === item.id}
                onClick={() => onSelectItem(item)}
              >
                {item.label}
              </ListItemButton>
            ))}
          </LetterSection>
        ))}
      </ScrollBody>
    </AlphabeticalListBody>
  );
};
