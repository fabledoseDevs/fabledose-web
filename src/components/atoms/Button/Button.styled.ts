import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import type {
  BUTTON_VARIANT as BUTTON_VARIANT_TYPE,
  WidthSpec,
} from '@/atoms/Button/Button.types';
import { BUTTON_VARIANT, WIDTH_TYPE } from '@/atoms/Button/Button.types';
import type { Theme } from '@/styles/types';

const buttonStyle = (theme: Theme) => css`
  margin: 5px auto;
  display: block;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  letter-spacing: 1px;
  line-height: 1;
  padding: 1rem 1.2rem;
  border-radius: 24px;
  font-size: clamp(1.25rem, 2vw, 1.8rem);
  font-weight: 600;

  @media ${theme.media.laptop} {
    padding: 1.2rem 2.4rem;
  }
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

const getWidthStyle = (width: WidthSpec) => {
  switch (width.widthType) {
    case WIDTH_TYPE.AUTO:
      return 'auto';
    case WIDTH_TYPE.PX:
      return typeof width.widthValue === 'number'
        ? `${width.widthValue}px`
        : 'auto';
    case WIDTH_TYPE.PERCENT:
      return typeof width.widthValue === 'number'
        ? `${width.widthValue}%`
        : 'auto';
    default:
      return 'auto';
  }
};

export const ButtonWrapper = styled.div<{
  width: WidthSpec;
}>`
  width: ${({ width }) => getWidthStyle(width)};
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
  variant: BUTTON_VARIANT_TYPE;
  width: WidthSpec;
}>`
  ${({ theme }) => buttonStyle(theme)};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ variant, theme }) => getTextColorStyle(variant, theme)};
  background: ${({ variant, theme }) => getBackgroundStyle(variant, theme)};
  border: ${({ variant, theme }) => getBorderStyle(variant, theme)};
  //box-shadow: ${({ variant, theme }) => getBoxShadowStyle(variant, theme)};
  backdrop-filter: ${({ variant }) =>
    variant === BUTTON_VARIANT.TRANSPARENT ? 'blur(8px)' : 'none'};
  width: ${({ width }) => getWidthStyle(width)};

  &:active {
    background: ${({ variant, theme }) =>
      getActiveBackgroundStyle(variant, theme)};
    //box-shadow: ${({ variant, theme }) =>
      getActiveBoxShadowStyle(variant, theme)};
  }

  &:disabled {
    background: ${({ variant, theme }) =>
      getDisabledBackgroundStyle(variant, theme)};
    //box-shadow: ${({ variant, theme }) =>
      getDisabledBoxShadowStyle(variant, theme)};
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;

export const LinkButtonBody = styled(Link)<{
  variant: BUTTON_VARIANT_TYPE;
  width: WidthSpec;
}>`
  ${({ theme }) => buttonStyle(theme)};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ variant, theme }) => getTextColorStyle(variant, theme)};
  background: ${({ variant, theme }) => getBackgroundStyle(variant, theme)};
  border: ${({ variant, theme }) => getBorderStyle(variant, theme)};
  //box-shadow: ${({ variant, theme }) => getBoxShadowStyle(variant, theme)};
  backdrop-filter: ${({ variant }) =>
    variant === BUTTON_VARIANT.TRANSPARENT ? 'blur(8px)' : 'none'};
  width: ${({ width }) => getWidthStyle(width)};

  &:active {
    background: ${({ variant, theme }) =>
      getActiveBackgroundStyle(variant, theme)};
    //box-shadow: ${({ variant, theme }) =>
      getActiveBoxShadowStyle(variant, theme)};
  }

  &:disabled {
    background: ${({ variant, theme }) =>
      getDisabledBackgroundStyle(variant, theme)};
    //box-shadow: ${({ variant, theme }) =>
      getDisabledBoxShadowStyle(variant, theme)};
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;
