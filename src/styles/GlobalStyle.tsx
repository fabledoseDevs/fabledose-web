'use client';
import '@/public/fonts/fonts.css';

import { css, Global, useTheme } from '@emotion/react';
import type { ReactElement } from 'react';

import type { Theme } from './types';

const GlobalStyle = (): ReactElement => {
  const theme = useTheme() as Theme;

  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          font-size: 10px;
          font-family: ${theme.typography.fonts.default};
          font-weight: ${theme.typography.fontWeights.regular};
          background-color: ${theme.palette.byElement.background.white};
          color: ${theme.palette.byElement.text.purple};
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        ul,
        ol {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        img {
          max-width: 100%;
          display: block;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        h1,
        h2 {
          margin: 0;
          font-family: ${theme.typography.fonts.headline};
          line-height: 1;
        }

        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
          font-family: ${theme.typography.fonts.default};
          line-height: 1.25;
        }
      `}
    />
  );
};

export default GlobalStyle;
