import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import React from 'react';

import { ThemeProvider } from '@/styles';
import GlobalStyle from '@/styles/GlobalStyle';

export const metadata: Metadata = {
  title: 'Fabledose | Biblioteka bajek',
  description:
    'Biblioteka bajek zawierająca animowane książki, audiobooki i ebooki dla dzieci oraz dorosłych.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { lang: string };
}>): Promise<React.JSX.Element> {
  const { lang } = await params;

  return (
    <html lang={lang || 'pl'}>
      <body>
        <ThemeProvider>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
