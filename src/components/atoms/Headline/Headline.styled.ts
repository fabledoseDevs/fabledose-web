import styled from '@emotion/styled';

export const JumboHeadline = styled.h1`
  font-size: ${({ theme }) => theme.typography.headlines.jumbo.fontSize};
  line-height: ${({ theme }) => theme.typography.headlines.jumbo.lineHeight};
  font-weight: ${({ theme }) => theme.typography.headlines.jumbo.fontWeight};
  margin: 0;
`;

export const BigHeadline = styled.h2`
  font-size: ${({ theme }) => theme.typography.headlines.big.fontSize};
  line-height: ${({ theme }) => theme.typography.headlines.big.lineHeight};
  font-weight: ${({ theme }) => theme.typography.headlines.big.fontWeight};
  margin: 0;
`;

export const SmallHeadline = styled.h3`
  font-size: ${({ theme }) => theme.typography.headlines.small.fontSize};
  line-height: ${({ theme }) => theme.typography.headlines.small.lineHeight};
  font-weight: ${({ theme }) => theme.typography.headlines.small.fontWeight};
  margin: 0;
`;

export const SupertextHeadline = styled.p`
  font-size: ${({ theme }) => theme.typography.headlines.superText.fontSize};
  line-height: ${({ theme }) =>
    theme.typography.headlines.superText.lineHeight};
  font-weight: ${({ theme }) =>
    theme.typography.headlines.superText.fontWeight};
  margin: 0;
  color: ${({ theme }) => theme.palette.byElement.text.lightRed};
`;
