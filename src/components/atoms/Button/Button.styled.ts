import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import type { BUTTON_VARIANT as BUTTON_VARIANT_TYPE } from '@/atoms/Button/Button.types';
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

const getBackgroundStyle = (
  styleVariant: BUTTON_VARIANT_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return theme.palette.byElement.background.transparentWhite['10'];
    case BUTTON_VARIANT.WHITE:
      return theme.palette.byElement.background.gradientWhite;
    case BUTTON_VARIANT.RED:
    default:
      return theme.palette.byElement.background.gradientRed;
  }
};

const getBorderStyle = (styleVariant: BUTTON_VARIANT_TYPE, theme: Theme) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return `2px solid ${theme.palette.byElement.background.transparentWhite['30']}`;
    case BUTTON_VARIANT.WHITE:
      return `1px solid ${theme.palette.byColor.white.full}`;
    case BUTTON_VARIANT.RED:
    default:
      return `1px solid ${theme.palette.byColor.red.regular}`;
  }
};

const getBoxShadowStyle = (styleVariant: BUTTON_VARIANT_TYPE, theme: Theme) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return 'none';
    case BUTTON_VARIANT.WHITE:
      return `0 8px 8px ${theme.palette.byElement.shadows.purple['10']}, inset 0 3px 4px ${theme.palette.byColor.white.full}`;
    case BUTTON_VARIANT.RED:
    default:
      return `0 8px 8px ${theme.palette.byElement.shadows.purple['10']}, inset 0 3px 4px ${theme.palette.byColor.red.light}`;
  }
};

const getActiveBackgroundStyle = (
  styleVariant: BUTTON_VARIANT_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return theme.palette.byElement.background.transparentWhite['20'];
    case BUTTON_VARIANT.WHITE:
      return theme.palette.byElement.background.gradientWhiteReversed;
    case BUTTON_VARIANT.RED:
    default:
      return theme.palette.byElement.background.gradientRedReverse;
  }
};

const getActiveBoxShadowStyle = (
  styleVariant: BUTTON_VARIANT_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return 'none';
    case BUTTON_VARIANT.WHITE:
      return `0 4px 8px ${theme.palette.byElement.shadows.purple['20']}, inset 0 2px 3px ${theme.palette.byColor.purple.pale}`;
    case BUTTON_VARIANT.RED:
    default:
      return `0 4px 8px ${theme.palette.byElement.shadows.purple['20']}, inset 0 2px 3px ${theme.palette.byColor.red.light}`;
  }
};

const getDisabledBackgroundStyle = (
  styleVariant: BUTTON_VARIANT_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return theme.palette.byElement.background.transparentWhite['05'];
    case BUTTON_VARIANT.WHITE:
      return theme.palette.byElement.background.transparentWhite['30'];
    case BUTTON_VARIANT.RED:
    default:
      return theme.palette.byElement.background.gradientRedReverse;
  }
};

const getDisabledBoxShadowStyle = (
  styleVariant: BUTTON_VARIANT_TYPE,
  theme: Theme,
) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.TRANSPARENT:
      return 'none';
    case BUTTON_VARIANT.WHITE:
      return 'none';
    case BUTTON_VARIANT.RED:
    default:
      return `inset 0 3px 4px ${theme.palette.byColor.red.light}`;
  }
};

const getTextColorStyle = (styleVariant: BUTTON_VARIANT_TYPE, theme: Theme) => {
  switch (styleVariant) {
    case BUTTON_VARIANT.WHITE:
      return theme.palette.byElement.text.purple;
    case BUTTON_VARIANT.TRANSPARENT:
    case BUTTON_VARIANT.RED:
    default:
      return theme.palette.byElement.text.white;
  }
};

export const ButtonWrapper = styled.div`
  width: fit-content;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ButtonIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ButtonBody = styled.button<{
  styleVariant: BUTTON_VARIANT_TYPE;
  width: string;
}>`
  ${buttonStyle};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ styleVariant, theme }) => getTextColorStyle(styleVariant, theme)};
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
  styleVariant: BUTTON_VARIANT_TYPE;
  width: string;
}>`
  ${buttonStyle};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ styleVariant, theme }) => getTextColorStyle(styleVariant, theme)};
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
