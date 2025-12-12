import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type {
  MiddlewareConfig,
  MiddlewareHandler,
  SupportedLocale,
} from './proxy.types';

const LOCALES: readonly SupportedLocale[] = ['pl', 'en'] as const;
const DEFAULT_LOCALE: SupportedLocale = 'pl';

const getLocale = (request: NextRequest): SupportedLocale => {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as
    | SupportedLocale
    | undefined;
  if (cookieLocale && LOCALES.includes(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase());

  for (const lang of languages) {
    if (lang === 'pl' || lang.startsWith('pl-')) return 'pl';
    if (lang === 'en' || lang.startsWith('en-')) return 'en';
  }

  return DEFAULT_LOCALE;
};

export const proxy: MiddlewareHandler = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
};

export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
