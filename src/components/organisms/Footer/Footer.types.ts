import type { ReactElement } from 'react';

import type { DictionaryType } from '@/lang/lang.types';
/**
 * @module
 * This file defines the types and interfaces for the Footer component.
 */

export interface FooterProps {
  dict: DictionaryType['footer'];
}

/**
 * Component renders Footer.
 * The Footer component displays the site's footer section with newsletter subscription form,
 * navigation links, social media links, copyright information, and legal links.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export type Footer = (props: FooterProps) => ReactElement;
