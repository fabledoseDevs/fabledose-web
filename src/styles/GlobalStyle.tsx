'use client';
import '@/public/fonts/fonts.css';

import { css, Global } from '@emotion/react';
import type { ReactElement } from 'react';

const GlobalStyle = (): ReactElement => (
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
        font-family: 'Baloo2', sans-serif;
        background-color: #ffffff;
        color: #000000;
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
        font-family: 'YesevaOne', serif;
      }

      h3,
      h4,
      h5,
      h6 {
        font-family: 'Baloo2', sans-serif;
      }
    `}
  />
);

export default GlobalStyle;
