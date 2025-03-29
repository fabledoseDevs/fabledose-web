"use client";

import { ThemeProvider as ThemeProviderBase } from '@emotion/react'
import { theme } from './theme'
import {ReactElement, ReactNode} from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps): ReactElement => (
  <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>
);

export default ThemeProvider;
