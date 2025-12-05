import type { ReactElement } from 'react';

import type { DictionaryType } from '@/lang/lang.types';

export interface LandingPageProps {
  dict: DictionaryType;
}

/**
 * @module
 * This file defines the types and interfaces for the LandingPage component.
 */

/**
 * Component renders a complete landing page for the application.
 * The landing page includes multiple sections such as:
 * - Top navigation bar
 * - Hero section with Jumbotron
 * - Featured story card
 * - Information boxes highlighting key features
 * - Registration banner with book covers
 * - FAQ section with accordion
 * - Footer
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <LandingPage />
 * ```
 */
export type LandingPage = (props: LandingPageProps) => ReactElement;
