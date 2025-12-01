import styled from '@emotion/styled';

export const PlanComparisonSimpleBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  margin: 48px 24px;

  @media ${({ theme }) => theme.media.laptop} {
    flex-direction: row;
  }
`;
