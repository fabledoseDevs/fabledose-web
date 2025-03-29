import { ThemeProvider as ThemeProviderBase } from '@emotion/react'
import { theme } from './theme'
import {ReactElement} from "react";

interface ThemeProviderProps {
  // TODO: FIX NEEDED!
  // Issue when installing type Children from @/types/general.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

const ThemeProvider = ({ children }: ThemeProviderProps): ReactElement => (
  <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>
);

export default ThemeProvider;
