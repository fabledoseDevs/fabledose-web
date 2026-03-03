import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import React from 'react';

import { SettingsProvider } from '@/contexts/SettingsContext';
import { DictionaryProvider } from '@/lang/DictionaryProvider';
import { getDictionary } from '@/lang/lang.helpers';
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
  params: Promise<{ lang: string }>;
}>): Promise<React.JSX.Element> {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <html lang={lang || 'pl'}>
      <body>
        <DictionaryProvider dictionary={dict}>
          <ThemeProvider>
            <SettingsProvider>
              <GlobalStyle />
              {children}
            </SettingsProvider>
          </ThemeProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
