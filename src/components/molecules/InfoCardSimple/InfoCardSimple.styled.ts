import styled from '@emotion/styled';

export const InfoCardSimpleBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 310px;
  padding: 24px;
  background-color: ${({ theme }) => theme.palette.byElement.background.white};
  border: 2px solid ${({ theme }) => theme.palette.byElement.background.purple};
  border-radius: 16px;
  gap: 84px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CtaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;
