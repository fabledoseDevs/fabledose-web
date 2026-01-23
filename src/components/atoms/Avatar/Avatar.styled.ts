import styled from '@emotion/styled';

import { AVATAR_SIZE } from './Avatar.types';

const getSize = (size: AVATAR_SIZE = AVATAR_SIZE.MEDIUM) => {
  switch (size) {
    case AVATAR_SIZE.SMALL:
      return '40px';
    case AVATAR_SIZE.LARGE:
      return '120px';
    case AVATAR_SIZE.MEDIUM:
    default:
      return '80px';
  }
};

export const AvatarWrapper = styled.div<{
  size?: AVATAR_SIZE;
  isActive?: boolean;
  isClickable?: boolean;
}>`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  border-radius: 50%;
  overflow: hidden;
  border: ${({ isActive, theme }) =>
    isActive
      ? `4px solid ${theme.palette.byColor.white.full}`
      : `2px solid ${theme.palette.byElement.background.transparentWhite['30']}`};
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
    theme.palette.byElement.background.transparentWhite['10']};

  &:hover {
    border-color: ${({ theme, isClickable, isActive }) =>
      isClickable && !isActive ? theme.palette.byColor.white.full : ''};
    transform: ${({ isClickable }) => (isClickable ? 'scale(1.05)' : 'none')};
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
