import styled from '@emotion/styled';

export const PriceTagBody = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  font-family: ${({ theme }) => theme.typography.headlines.big.fontFamily};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
`;

export const PriceRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 6px;
  width: auto;
`;

export const Price = styled.div`
  line-height: 1;
  font-size: ${({ theme }) => theme.typography.headlines.big.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
`;

export const Currency = styled.div`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
`;

export const Period = styled.div`
  text-align: right;
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
`;
