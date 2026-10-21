'use client';

import createCache from '@emotion/cache';
import {
  CacheProvider,
  ThemeProvider as ThemeProviderBase,
} from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { type ReactElement, useState } from 'react';

import { theme } from './theme';
import type { EmittedStyle, ThemeProviderProps } from './ThemeProvider.types';

const ThemeProvider = ({ children }: ThemeProviderProps): ReactElement => {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    const insert = cache.insert;
    let names: EmittedStyle[] = [];
    cache.insert = (...args) => {
      if (cache.inserted[args[1].name] === undefined)
        names.push({ name: args[1].name, global: !args[0] });
      return insert(...args);
    };
    return {
      cache,
      flush: () => {
        const result = names;
        names = [];
        return result;
      },
    };
  });
  // Emit styles before streamed HTML, rather than as siblings of hydrated elements.
  useServerInsertedHTML(() => {
    const entries = flush();
    if (!entries.length) return null;
    return (
      <>
        {entries.map(({ name, global }) => (
          <style
            key={name}
            data-emotion={`${cache.key}${global ? '-global' : ''} ${name}`}
            dangerouslySetInnerHTML={{ __html: String(cache.inserted[name]) }}
          />
        ))}
      </>
    );
  });
  return (
    <CacheProvider value={cache}>
      <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>
    </CacheProvider>
  );
};

export default ThemeProvider;
