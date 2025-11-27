import styled from '@emotion/styled';

export const InfoCardSimpleBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 310px;
  padding: 24px;
  background-color: ${({ theme }) => theme.palette.byElement.background.white};
  border: 2px solid ${({ theme }) => theme.palette.byElement.background.purple};
  border-radius: 16px;
`;

export const InfoContainer = styled.div<{ height?: number }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: ${({ height }) => height}px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;

export const List = styled.ul`
  list-style: disc;
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  font-family: ${({ theme }) => theme.typography.paragraphs.default.fontFamily};
  color: ${({ theme }) => theme.palette.byElement.text.purple};

  li {
    margin-left: 24px;
    line-height: 1.2;
  }
`;
