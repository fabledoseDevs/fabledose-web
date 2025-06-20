import styled from '@emotion/styled';

export const TopBarBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.palette.byElement.background.purple};
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;
