import styled from '@emotion/styled';

export const DetailsBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  font-size: 1.6rem;
  line-height: 1.65;
  overflow-wrap: anywhere;
`;

export const DetailsSection = styled.section`
  min-width: 0;
  h3 {
    margin: 0 0 12px;
    font-size: 2rem;
    line-height: 1.3;
  }
  p {
    margin: 0;
  }
  p + p {
    margin-top: 14px;
  }
`;

export const TagsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

export const SynopsisHint = styled.p`
  font-size: 1.35rem;
  line-height: 1.5;
  padding: 12px 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.byElement.highlights.palePurple};
`;

export const SynopsisText = styled.div`
  margin-top: 16px;
`;
