import styled from '@emotion/styled';

import { Tooltip } from '@/atoms/TagIcon/TagIcon.styled';

export const ResetButtonContainer = styled.div`
  position: relative;
  display: inline-flex;
  flex: 0 0 54px;
  width: 54px;
  height: 54px;
  margin: 5px 0;
`;

export const ResetButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 54px;
  height: 54px;
  padding: 12px;
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  background: ${({ theme }) =>
    theme.palette.byElement.background.transparentWhite['10']};
  border: 2px solid
    ${({ theme }) => theme.palette.byElement.background.transparentWhite['30']};
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    width: 26px;
    height: 26px;
  }

  &:hover {
    background: ${({ theme }) =>
      theme.palette.byElement.background.transparentWhite['20']};
  }
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }
  &:disabled {
    cursor: wait;
    opacity: 0.5;
  }
`;

export const ResetTooltip = styled(Tooltip)`
  left: 0;
  transform: none;
  width: max-content;
  &::after {
    left: 27px;
  }
`;
