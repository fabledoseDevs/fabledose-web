import styled from '@emotion/styled';

export const SearchResultsBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ResultTilesList = styled.div`
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const EmptyState = styled.div`
  margin-top: 10px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) =>
    theme.palette.byElement.background.transparentWhite['10']};
`;
