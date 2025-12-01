import styled from '@emotion/styled';

export const InfoCardSimpleBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: 24px;
  background-color: ${({ theme }) => theme.palette.byElement.background.white};
  border: 2px solid ${({ theme }) => theme.palette.byElement.background.purple};
  border-radius: 16px;
  gap: 84px;
  justify-content: space-between;

  @media ${({ theme }) => theme.media.laptop} {
    width: 310px;
  }
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
