import styled from '@emotion/styled';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { COLOR_SCHEME } from './Dropdown.types';

export const DropdownBody = styled.div`
  position: relative;
  width: fit-content;
`;

export const DropdownHeader = styled.button<{
  isopen: boolean;
  colorScheme: COLOR_SCHEME;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: none;
  padding: 8px 12px;
  margin: 0;
  min-width: 100px;
  border-radius: ${({ isopen }) => (isopen ? '8px 8px 0 0' : '8px')};
  transition: background 0.2s ease, color 0.2s ease;
  font-family: ${({ theme }) =>
    theme.typography.headlines.superText.fontFamily};
  font-size: ${({ theme }) => theme.typography.headlines.superText.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme, colorScheme, isopen }) => {
    if (isopen && colorScheme === COLOR_SCHEME.WHITE) {
      return theme.palette.byElement.text.purple;
    }
    return theme.palette.byElement.text.white;
  }};
  background: ${({ theme, colorScheme, isopen }) => {
    if (isopen) {
      return colorScheme === COLOR_SCHEME.WHITE
        ? theme.palette.byElement.background.white
        : theme.palette.byElement.background.purple;
    }
    return 'transparent';
  }};

  &:hover {
    background: ${({ theme, colorScheme }) => {
      if (colorScheme === COLOR_SCHEME.WHITE) {
        return theme.palette.byElement.background.white;
      }
      return theme.palette.byElement.background.purple;
    }};
    color: ${({ theme, colorScheme }) => {
      if (colorScheme === COLOR_SCHEME.WHITE) {
        return theme.palette.byElement.text.purple;
      }
      return theme.palette.byElement.text.white;
    }};
  }
`;

export const DropdownArrow = styled(ChevronDownIcon, {
  shouldForwardProp: prop => prop !== 'isopen',
})<{ isopen: boolean }>`
  display: inline-block;
  margin-left: 8px;
  width: 16px;
  height: 16px;
  stroke-width: 3;
  transform: ${({ isopen }) => (isopen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const DropdownOptions = styled.div<{ isopen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  display: ${({ isopen }) => (isopen ? 'flex' : 'none')};
  flex-direction: column;
  background: ${({ theme }) => theme.palette.byElement.background.white};
  box-shadow: 0px 10px 20px
    ${({ theme }) => theme.palette.byElement.shadows.purple['20']};
  z-index: ${({ theme }) => theme.zIndex.higher};
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.byElement.background.white};
  border-top: none;
`;

export const Option = styled.div<{
  colorScheme: COLOR_SCHEME;
}>`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  margin: 0;
  font-family: ${({ theme }) => theme.typography.paragraphs.default.fontFamily};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
  background: ${({ theme }) => theme.palette.byElement.background.white};
  cursor: pointer;
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.palette.byElement.highlights.palePurple};
  }
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.span`
  cursor: pointer;
`;
