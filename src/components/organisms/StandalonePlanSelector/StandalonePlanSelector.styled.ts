import styled from '@emotion/styled';

export const PlanSelectorBody = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 100vh;
`;

export const SelectorCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 100%;
  padding: 48px 24px;
  border-radius: 40px;
  gap: 12px;
  background-color: ${({ theme }) => theme.palette.byElement.background.white};
`;

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
