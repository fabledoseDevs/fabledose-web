import '@emotion/react';

import type { Theme as ThemeType } from '@/styles/types.ts';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
