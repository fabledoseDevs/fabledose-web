import type { ReactElement } from 'react';

import type { SIDEBAR_ICON } from '@/atoms/SidebarIcon/SidebarIcon.types';

/**
 * @module
 * This file defines the types and interfaces for the SidebarMenu component.
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
}

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
