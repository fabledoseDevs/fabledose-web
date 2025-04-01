'use client';

import { ThemeProvider as ThemeProviderBase } from '@emotion/react';
import type { ReactElement, ReactNode } from 'react';

import { theme } from './theme';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps): ReactElement => (
  <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>
);

export default ThemeProvider;
