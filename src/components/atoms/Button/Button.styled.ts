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

const getIconSize = (sizevariant: BUTTON_SIZE) => {
  switch (sizevariant) {
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
  font-family: "Lato", sans-serif;
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

export const ButtonIcon = styled.img<{ sizevariant: BUTTON_SIZE }>`
  display: inline-block;
  vertical-align: middle;
  overflow: clip;
  border-radius: 50%;
  margin: -5px 10px 0 -34px;
  ${({ sizevariant }) => getIconSize(sizevariant)};
`;

export const ButtonBody = styled.button<{
  colorvariant: BUTTON_COLOR;
  sizevariant: BUTTON_SIZE;
  iconispresent: boolean;
}>`
  ${buttonStyle};
  padding-right: ${({ iconispresent }) => (iconispresent ? "15px" : "40px")};
  ${({ colorvariant, theme }) => getColorScheme(colorvariant, theme)};
  ${({ sizevariant }) => getSizeStyles(sizevariant)};
`;

export const LinkButtonBody = styled(Link)<{
  colorvariant: BUTTON_COLOR;
  sizevariant: BUTTON_SIZE;
  iconispresent: boolean;
}>`
  ${buttonStyle};
  padding-right: ${({ iconispresent }) => (iconispresent ? "15px" : "40px")};
  ${({ colorvariant, theme }) => getColorScheme(colorvariant, theme)};
  ${({ sizevariant }) => getSizeStyles(sizevariant)};
`;
