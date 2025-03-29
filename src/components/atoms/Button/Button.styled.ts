import styled from '@emotion/styled'
import { css } from "@emotion/react";
import Link from "next/link";
import {BUTTON_COLOR, BUTTON_SIZE} from "@/atoms/Button/Button.types";
import { Theme } from "@/styles/types";

const getColorScheme = (colorvariant: BUTTON_COLOR, theme: Theme) => {
  switch (colorvariant) {
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

const getSizeStyles = (sizevariant: BUTTON_SIZE) => {
  switch (sizevariant) {
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

const buttonStyle = css`
  border: none;
  padding: 10px 40px;
  border-radius: 28px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;
`;

export const ButtonWrapper = styled.div`
  width: fit-content;
`;

export const ButtonIcon = styled.img``;

export const ButtonBody = styled.button<{
  colorvariant: BUTTON_COLOR;
  sizevariant: BUTTON_SIZE;
}>`
  ${buttonStyle};
  ${({ colorvariant, theme }) => getColorScheme(colorvariant, theme)};
  ${({ sizevariant }) => getSizeStyles(sizevariant)};
`;

export const LinkButtonBody = styled(Link)`
  ${buttonStyle};
`;
