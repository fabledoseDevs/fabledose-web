import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import type { BUTTON_VARIANT as BUTTON_VARIAN_TYPE } from '@/atoms/Button/Button.types';
import { BUTTON_VARIANT } from '@/atoms/Button/Button.types';
import type { Theme } from '@/styles/types';

const buttonStyle = css`
  margin: 5px auto;
  display: block;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  letter-spacing: 1px;
  line-height: 1;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 1.8rem;
  font-weight: 600;
`;

const getBackgroundStyle = (styleVariant: BUTTON_VARIAN_TYPE, theme: Theme) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return theme.palette.byElement.background.transparentWhite['10'];
    case BUTTON_VARIANT.RED:
    default:
      return theme.palette.byElement.background.gradientRed;
  }
};

const getBorderStyle = (styleVariant: BUTTON_VARIAN_TYPE, theme: Theme) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return `2px solid ${theme.palette.byElement.background.transparentWhite['30']}`;
    case BUTTON_VARIANT.RED:
    default:
      return `1px solid ${theme.palette.byColor.red.regular}`;
  }
};

const getBoxShadowStyle = (styleVariant: BUTTON_VARIAN_TYPE, theme: Theme) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return 'none';
    case BUTTON_VARIANT.RED:
    default:
      return `0 8px 8px ${theme.palette.byElement.shadows.purple['10']}, inset 0 3px 4px ${theme.palette.byColor.red.light}`;
  }
};

const getActiveBackgroundStyle = (
  styleVariant: BUTTON_VARIAN_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return theme.palette.byElement.background.transparentWhite['20'];
    case BUTTON_VARIANT.RED:
    default:
      return theme.palette.byElement.background.gradientRedReverse;
  }
};

const getActiveBoxShadowStyle = (
  styleVariant: BUTTON_VARIAN_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return 'none';
    case BUTTON_VARIANT.RED:
    default:
      return `0 4px 8px ${theme.palette.byElement.shadows.purple['20']}, inset 0 2px 3px ${theme.palette.byColor.red.light}`;
  }
};

const getDisabledBackgroundStyle = (
  styleVariant: BUTTON_VARIAN_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return theme.palette.byElement.background.transparentWhite['05'];
    case BUTTON_VARIANT.RED:
    default:
      return theme.palette.byElement.background.gradientRedReverse;
  }
};

const getDisabledBoxShadowStyle = (
  styleVariant: BUTTON_VARIAN_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return 'none';
    case BUTTON_VARIANT.RED:
    default:
      return `inset 0 3px 4px ${theme.palette.byColor.red.light}`;
  }
};

export const ButtonWrapper = styled.div`
  width: fit-content;
`;

export const ButtonBody = styled.button<{
  styleVariant: BUTTON_VARIAN_TYPE;
  width: string;
}>`
  ${buttonStyle};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  background: ${({ styleVariant, theme }) =>
    getBackgroundStyle(styleVariant, theme)};
  border: ${({ styleVariant, theme }) => getBorderStyle(styleVariant, theme)};
  box-shadow: ${({ styleVariant, theme }) =>
    getBoxShadowStyle(styleVariant, theme)};
  backdrop-filter: ${({ styleVariant }) =>
    styleVariant === BUTTON_VARIANT.TRANSPARENT ? 'blur(8px)' : 'none'};
  width: ${({ width }) => width};

  &:active {
    background: ${({ styleVariant, theme }) =>
      getActiveBackgroundStyle(styleVariant, theme)};
    box-shadow: ${({ styleVariant, theme }) =>
      getActiveBoxShadowStyle(styleVariant, theme)};
  }

  &:disabled {
    background: ${({ styleVariant, theme }) =>
      getDisabledBackgroundStyle(styleVariant, theme)};
    box-shadow: ${({ styleVariant, theme }) =>
      getDisabledBoxShadowStyle(styleVariant, theme)};
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;

export const LinkButtonBody = styled(Link)<{
  styleVariant: BUTTON_VARIAN_TYPE;
  width: string;
}>`
  ${buttonStyle};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  background: ${({ styleVariant, theme }) =>
    getBackgroundStyle(styleVariant, theme)};
  border: ${({ styleVariant, theme }) => getBorderStyle(styleVariant, theme)};
  box-shadow: ${({ styleVariant, theme }) =>
    getBoxShadowStyle(styleVariant, theme)};
  backdrop-filter: ${({ styleVariant }) =>
    styleVariant === BUTTON_VARIANT.TRANSPARENT ? 'blur(8px)' : 'none'};
  width: ${({ width }) => width};

  &:active {
    background: ${({ styleVariant, theme }) =>
      getActiveBackgroundStyle(styleVariant, theme)};
    box-shadow: ${({ styleVariant, theme }) =>
      getActiveBoxShadowStyle(styleVariant, theme)};
  }

  &:disabled {
    background: ${({ styleVariant, theme }) =>
      getDisabledBackgroundStyle(styleVariant, theme)};
    box-shadow: ${({ styleVariant, theme }) =>
      getDisabledBoxShadowStyle(styleVariant, theme)};
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;
