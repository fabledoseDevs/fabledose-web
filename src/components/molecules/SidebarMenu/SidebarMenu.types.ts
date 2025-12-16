import type { ReactElement } from 'react';

import type { SIDEBAR_ICON } from '@/atoms/SidebarIcon/SidebarIcon.types';

/**
 * @module
 * This file defines the types and interfaces for the SidebarMenu component and
 * its companion hook responsible for locale-agnostic path normalization.
 */

/**
 * Configuration for a single item in the SidebarMenu.
 *
 * @property icon - Icon to display next to the item label. Must be one of {@link SIDEBAR_ICON}.
 * @property href - Navigation destination for the item (absolute or Next.js route path).
 */
export interface SidebarMenuItemConfig {
  icon: SIDEBAR_ICON;
  href: string;
}

/**
 * Interface for SidebarMenu component props.
 *
 * @property menuItems - Ordered list of menu entries to render in the sidebar.
 */
export interface SidebarMenuProps {
  menuItems: SidebarMenuItemConfig[];
  /**
   * Layout direction for the menu items. Defaults to 'column'.
   * - Use 'column' for vertical stacks (desktop sidebar)
   * - Use 'row' for horizontal layout (mobile bottom bar)
   */
  direction?: 'row' | 'column';
}

/**
 * Normalizes a path to be locale-agnostic and consistent for comparisons.
 *
 * @remarks
 * - Strips a leading two-letter locale segment (e.g., "/pl", "/en").
 * - Removes trailing slashes except for the root path "/".
 *
 * @param path - A route path to normalize. Can be absolute or relative.
 * @returns Normalized path string starting with "/".
 */
export type NormalizePath = (path: string) => string;

/**
 * Hook returning data and helpers used by the SidebarMenu component.
 *
 * @returns Object with:
 *  - `pathname`: Current pathname from Next.js router.
 *  - `normalizePath`: {@link NormalizePath} helper to compare paths reliably across locales.
 *
 * @example
 * ```ts
 * const { pathname, normalizePath } = useSidebarMenu();
 * const isActive = normalizePath(pathname) === normalizePath('/library');
 * ```
 */
export type useSidebarMenu = () => {
  pathname: string;
  normalizePath: NormalizePath;
};

/**
 * Component renders SidebarMenu.
 *
 * @param props - The component properties:
 *  - `menuItems`: List of items to display. Each item specifies an `icon` (see {@link SIDEBAR_ICON}) and `href`.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SidebarMenu
 *   menuItems={[
 *     { icon: SIDEBAR_ICON.SEARCH, href: '/search' },
 *     { icon: SIDEBAR_ICON.LIBRARY, href: '/library' },
 *   ]}
 * />
 * ```
 */
export type SidebarMenu = (props: SidebarMenuProps) => ReactElement;
