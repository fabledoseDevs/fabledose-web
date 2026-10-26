import styled from '@emotion/styled';
export const StatusBody = styled.div<{ $floating: boolean }>`
  position: ${({ $floating }) => ($floating ? 'fixed' : 'relative')};
  bottom: ${({ $floating }) =>
    $floating ? 'calc(100px + env(safe-area-inset-bottom, 0px))' : 'auto'};
  right: ${({ $floating }) => ($floating ? '16px' : 'auto')};
  z-index: 20;
  width: ${({ $floating }) =>
    $floating ? 'min(360px, calc(100vw - 32px))' : '100%'};
  max-width: 100%;
  padding: 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.byElement.background.darkPurple};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  box-sizing: border-box;
  overflow-wrap: anywhere;
`;
