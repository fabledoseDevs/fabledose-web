import styled from '@emotion/styled';

export const AlphabeticalListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ColumnTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.headlines.small.fontFamily};
  font-size: ${({ theme }) => theme.typography.headlines.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

export const ScrollBody = styled.div`
  max-height: 470px;
  overflow-y: auto;
  padding-right: 8px;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.byColor.purple.pale}
    ${({ theme }) => theme.palette.byElement.background.darkPurple};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.byElement.background.darkPurple};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.byColor.purple.pale};
    border-radius: 8px;
  }
`;

export const LetterSection = styled.section`
  margin-bottom: 12px;
`;

export const LetterHeadline = styled.h3`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.headlines.small.fontFamily};
  font-size: ${({ theme }) => theme.typography.headlines.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

export const ListItemButton = styled.button<{ isSelected?: boolean }>`
  display: block;
  width: fit-content;
  margin: 0;
  padding: 2px 4px;
  border: 0;
  border-radius: 4px;
  text-align: left;
  background: ${({ theme, isSelected }) =>
    isSelected
      ? theme.palette.byElement.background.transparentWhite['20']
      : 'transparent'};
  color: ${({ theme }) => theme.palette.byElement.text.ecru};
  font-family: ${({ theme }) => theme.typography.paragraphs.default.fontFamily};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  line-height: 1.35;
  cursor: pointer;
  text-decoration: ${({ isSelected }) => (isSelected ? 'underline' : 'none')};
`;

export const EmptyState = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.byElement.text.ecru};
  font-family: ${({ theme }) => theme.typography.paragraphs.default.fontFamily};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
`;
