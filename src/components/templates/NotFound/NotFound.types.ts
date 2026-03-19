import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the NotFound template.
 */

/**
 * Component renders the localized 404 page.
 * The page includes:
 * - Fixed, full-screen background image centered by midpoint
 * - Main headline and supporting subtitle from translations
 * - Return button navigating back to the locale root
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <NotFound />
 * ```
 */
export type NotFound = () => ReactElement;
