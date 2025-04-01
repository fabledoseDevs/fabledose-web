import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import type { Theme } from '@/styles/types';

import { BUTTON_COLOR, BUTTON_SIZE } from './Button.types';

const getColorScheme = (colorVariant: BUTTON_COLOR, theme: Theme) => {
  switch (colorVariant) {
    case BUTTON_COLOR.BEIGE:
      return css`
        background-color: ${theme.palette.basic.beige};
        color: ${theme.palette.basic.black};
      `;
    case BUTTON_COLOR.DENIM:
      return css`
        background-color: ${theme.palette.basic.denim};
        color: ${theme.palette.basic.white};
      `;
    case BUTTON_COLOR.WASABI:
      return css`
        background-color: ${theme.palette.basic.wasabi};
        color: ${theme.palette.basic.white};
      `;
    case BUTTON_COLOR.CORAL:
      return css`
        background-color: ${theme.palette.basic.coral};
        color: ${theme.palette.basic.white};
      `;
    default:
      return css`
        background-color: ${theme.palette.basic.beige};
        color: ${theme.palette.basic.white};
      `;
  }
};

const getSizeStyles = (sizeVariant: BUTTON_SIZE) => {
  switch (sizeVariant) {
    case BUTTON_SIZE.FLUFFY:
      return css`
        height: 75px;
        font-size: 40px;
        border-radius: 38px;
      `;
    case BUTTON_SIZE.DEFAULT:
    default:
      return css`
        height: 50px;
        font-size: 20px;
        border-radius: 25px;
      `;
  }
};

const getIconSize = (sizeVariant: BUTTON_SIZE) => {
  switch (sizeVariant) {
    case BUTTON_SIZE.FLUFFY:
      return css`
        width: 65px;
        height: 65px;
      `;
    case BUTTON_SIZE.DEFAULT:
    default:
      return css`
        width: 39px;
        height: 39px;
      `;
  }
};

const buttonStyle = css`
  display: block;
  box-sizing: border-box;
  border: none;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-family: 'Lato', sans-serif;
  cursor: pointer;
  letter-spacing: 1px;
  line-height: 1.25;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
`;

export const ButtonWrapper = styled.div`
  width: fit-content;
`;

export const ButtonIcon = styled.img<{ sizeVariant: BUTTON_SIZE }>`
  display: inline-block;
  vertical-align: middle;
  overflow: clip;
  border-radius: 50%;
  margin: -5px 10px 0 -34px;
  ${({ sizeVariant }) => getIconSize(sizeVariant)};
`;

export const ButtonBody = styled.button<{
  colorVariant: BUTTON_COLOR;
  sizeVariant: BUTTON_SIZE;
  iconIsPresent: boolean;
}>`
  ${buttonStyle};
  padding-right: ${({ iconIsPresent }) => (iconIsPresent ? '15px' : '40px')};
  ${({ colorVariant, theme }) => getColorScheme(colorVariant, theme)};
  ${({ sizeVariant }) => getSizeStyles(sizeVariant)};
`;

export const LinkButtonBody = styled(Link)<{
  colorVariant: BUTTON_COLOR;
  sizeVariant: BUTTON_SIZE;
  iconIsPresent: boolean;
}>`
  ${buttonStyle};
  padding-right: ${({ iconIsPresent }) => (iconIsPresent ? '15px' : '40px')};
  ${({ colorVariant, theme }) => getColorScheme(colorVariant, theme)};
  ${({ sizeVariant }) => getSizeStyles(sizeVariant)};
`;
