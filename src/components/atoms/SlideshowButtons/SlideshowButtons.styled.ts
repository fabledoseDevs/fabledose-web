import styled from '@emotion/styled';

export const SlideshowButtonsBody = styled.button<{
  isVisible: boolean;
  disabled: boolean;
}>`
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid
    ${({ theme }) => theme.palette.byElement.background.transparentWhite['30']};
  background: ${({ theme }) => theme.palette.byElement.background.darkPurple};
  backdrop-filter: blur(4px);
  color: ${({ theme }) => theme.palette.byElement.text.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ isVisible, disabled }) => {
    if (disabled) {
      return 0.2;
    }

    return isVisible ? 0.92 : 0.15;
  }};
  transform: ${({ isVisible }) => (isVisible ? 'scale(1)' : 'scale(0.96)')};
  transition: opacity 0.35s ease, transform 0.35s ease,
    background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.palette.byElement.background.extraDarkPurple};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.palette.byElement.background.transparentWhite['30']};
    outline-offset: 2px;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
