import styled from '@emotion/styled';

export const StyledArticleLink = styled.a`
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;
