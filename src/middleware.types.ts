import type { NextRequest } from 'next/server';
import type { NextFetchEvent } from 'next/server';

/**
 * @module Middleware Types
 * Typed contracts and documentation for the Next.js middleware used to handle locale-aware routing.
 *
 * The middleware detects the user preferred locale (cookie > Accept-Language header)
 * and enforces locale prefixes in paths (e.g., "/pl" or "/en").
 */

/**
 * Supported locale codes in the application.
 *
 * @remarks
 * Extend this union when new locales are introduced, and ensure that the
 * LOCALES constant in middleware.ts is updated accordingly.
 */
export type SupportedLocale = 'pl' | 'en';

/**
 * Immutable list of supported locales.
 */
export type Locales = readonly SupportedLocale[];

/**
 * Function that resolves the most suitable locale for a request.
 *
 * Priority order:
 * 1. Cookie: `NEXT_LOCALE`
 * 2. `Accept-Language` header (first supported language in order)
 * 3. Fallback to default locale
 */
export type LocaleDetector = (request: NextRequest) => SupportedLocale;

/**
 * Shape of the exported Next.js middleware function.
 */
export type MiddlewareHandler = (
  request: NextRequest,
  event?: NextFetchEvent,
) => Response | void | Promise<Response | void>;

/**
 * Configuration object for Next.js middleware export.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export interface MiddlewareConfig {
  matcher: string[];
}
