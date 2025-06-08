import styled from '@emotion/styled';

export const JumboHeadline = styled.h1`
  font-size: ${({ theme }) => theme.typography.headlines.jumbo.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
`;

export const BigHeadline = styled.h2`
  font-size: ${({ theme }) => theme.typography.headlines.big.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
`;

export const SmallHeadline = styled.h3`
  font-size: ${({ theme }) => theme.typography.headlines.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

export const SupertextHeadline = styled.p`
  font-size: ${({ theme }) => theme.typography.headlines.superText.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin: 0;
  color: ${({ theme }) => theme.palette.byElement.text.lightRed};
  text-transform: uppercase;
`;
