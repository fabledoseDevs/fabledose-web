import styled from '@emotion/styled';

export const SidebarIconBody = styled.div<{ styleVariant: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background-color: ${({ theme, styleVariant }) =>
    styleVariant
      ? theme.palette.byElement.background.purple
      : theme.palette.byElement.background.white};

  &:hover {
    cursor: pointer;
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme, styleVariant }) =>
      styleVariant
        ? theme.palette.byElement.background.white
        : theme.palette.byElement.background.purple};

    &:hover {
      cursor: pointer;
    }
  }
`;
