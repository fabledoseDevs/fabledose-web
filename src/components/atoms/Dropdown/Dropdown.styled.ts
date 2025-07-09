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
  padding: 8px;
  margin: 0;
  min-width: 75px;
  font-family: ${({ theme }) =>
    theme.typography.headlines.superText.fontFamily};
  font-size: ${({ theme }) => theme.typography.headlines.superText.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme, colorScheme }) =>
    colorScheme === COLOR_SCHEME.PURPLE
      ? theme.palette.byElement.text.white
      : theme.palette.byElement.text.purple};
  background: ${({ theme, colorScheme, isopen }) =>
    isopen
      ? colorScheme === COLOR_SCHEME.PURPLE
        ? theme.palette.byElement.background.purple
        : theme.palette.byElement.background.white
      : 'transparent'};
`;

export const DropdownArrow = styled(ChevronDownIcon)<{ isopen: boolean }>`
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
  right: 0;
  display: ${({ isopen }) => (isopen ? 'flex' : 'none')};
  flex-direction: column;
`;

export const Option = styled.div<{
  colorScheme: COLOR_SCHEME;
}>`
  align-items: center;
  padding: 8px;
  margin: 0;
  font-family: ${({ theme }) => theme.typography.paragraphs.default.fontFamily};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  border-bottom: 2px solid
    ${({ theme, colorScheme }) =>
      colorScheme === COLOR_SCHEME.PURPLE
        ? theme.palette.byElement.background.white
        : theme.palette.byElement.background.purple};
  color: ${({ theme, colorScheme }) =>
    colorScheme === COLOR_SCHEME.PURPLE
      ? theme.palette.byElement.text.white
      : theme.palette.byElement.text.purple};
  background: ${({ theme, colorScheme }) =>
    colorScheme === COLOR_SCHEME.PURPLE
      ? theme.palette.byElement.background.purple
      : theme.palette.byElement.background.white};
  cursor: pointer;

  &:hover {
    background: ${({ theme, colorScheme }) =>
      colorScheme === COLOR_SCHEME.PURPLE
        ? theme.palette.byElement.highlights.darkPurple
        : theme.palette.byElement.highlights.palePurple};
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.span`
  cursor: pointer;
`;
