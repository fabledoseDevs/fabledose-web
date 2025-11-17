import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

import { ThemeProvider } from '@/styles';
import GlobalStyle from '@/styles/GlobalStyle';

export const metadata: Metadata = {
  title: 'Fabledose | Biblioteka bajek',
  description:
    'Biblioteka bajek zawierająca animowane książki, audiobooki i ebooki dla dzieci oraz dorosłych.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
