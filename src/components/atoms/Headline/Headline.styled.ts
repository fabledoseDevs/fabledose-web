import styled from '@emotion/styled';

export const JumboHeadline = styled.h1<{
  color?: string;
}>`
  font-size: ${({ theme }) => theme.typography.headlines.jumbo.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme, color }) =>
    theme.palette.byElement.text[
      color as keyof typeof theme.palette.byElement.text
    ]};
`;

export const BigHeadline = styled.h2<{
  color?: string;
}>`
  font-size: ${({ theme }) => theme.typography.headlines.big.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme, color }) =>
    theme.palette.byElement.text[
      color as keyof typeof theme.palette.byElement.text
    ]};
`;

export const SmallHeadline = styled.h3<{
  color?: string;
}>`
  font-size: ${({ theme }) => theme.typography.headlines.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme, color }) =>
    theme.palette.byElement.text[
      color as keyof typeof theme.palette.byElement.text
    ]};
`;

export const SupertextHeadline = styled.p`
  font-size: ${({ theme }) => theme.typography.headlines.superText.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin: 0;
  color: ${({ theme }) => theme.palette.byElement.text.lightRed};
  text-transform: uppercase;
`;
