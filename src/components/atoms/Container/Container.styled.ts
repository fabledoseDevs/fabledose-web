import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { JSX } from 'react';

import type { Theme } from '@/styles/types';

import type { StyledContainerProps } from './Container.types';
import { BACKGROUND_COLOR, FLEX_ALIGNMENT, PADDING } from './Container.types';

const getPadding = (padding: PADDING | undefined) => {
  switch (padding) {
    case PADDING.NONE:
      return `0`;
    case PADDING.STANDARD:
      return `2.4rem`;
    case PADDING.DOUBLE:
      return `4.8rem`;
    default:
      return `0`;
  }
};

const getFlexAlignment = (alignment: FLEX_ALIGNMENT | undefined) => {
  switch (alignment) {
    case FLEX_ALIGNMENT.START:
      return `flex-start`;
    case FLEX_ALIGNMENT.CENTER:
      return `center`;
    case FLEX_ALIGNMENT.END:
      return `flex-end`;
    case FLEX_ALIGNMENT.STRETCH:
      return `stretch`;
    default:
      return 'flex-start';
  }
};

const getBackgroundColor = (
  theme: Theme,
  backgroundColor: BACKGROUND_COLOR | undefined,
) => {
  switch (backgroundColor) {
    case BACKGROUND_COLOR.WHITE:
      return theme.palette.byElement.background.white;
    case BACKGROUND_COLOR.PURPLE:
      return theme.palette.byElement.background.purple;
    case BACKGROUND_COLOR.DARK_PURPLE:
      return theme.palette.byElement.background.darkPurple;
    default:
      return 'transparent';
  }
};

const sharedStyles = ({
  theme,
  ...props
}: StyledContainerProps & { theme: Theme }) => css`
  display: flex;
  flex-direction: column;
  justify-content: ${getFlexAlignment(props.justifyContent)};
  align-items: ${getFlexAlignment(props.alignItems)};
  padding-top: ${getPadding(props.verticalPadding)};
  padding-bottom: ${getPadding(props.verticalPadding)};
  padding-left: ${props.mobilePadding ? '2.4rem' : '0'};
  padding-right: ${props.mobilePadding ? '2.4rem' : '0'};
  gap: ${props.gap ? '2.4rem' : '0'};
  margin: 0 auto;
  width: 100%;
  max-width: ${props.maxWidth ? `${props.maxWidth}px` : '100%'};
  background-color: ${getBackgroundColor(theme, props.backgroundColor)};
  box-sizing: border-box;
  overflow-x: clip;

  @media ${theme.media.desktop} {
    padding-left: 0;
    padding-right: 0;
  }

  @media ${theme.media.laptop} {
    flex-direction: ${props.flexDirection ?? 'column'};
  }
`;

const createStyledContainer = <Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
) => styled(tag)<StyledContainerProps>(sharedStyles);

export const StyledDiv = createStyledContainer('div');
export const StyledSection = createStyledContainer('section');
export const StyledAside = createStyledContainer('aside');
export const StyledHeader = createStyledContainer('header');
export const StyledFooter = createStyledContainer('footer');
