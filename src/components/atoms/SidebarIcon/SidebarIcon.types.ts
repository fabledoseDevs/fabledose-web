import type { ReactElement } from 'react';
/**
 * @module
 * This file defines the types and interfaces for the SidebarIcon component.
 */

/**
 * Possible icon identifiers used by the SidebarIcon component.
 *
 * @remarks
 * - `SEARCH`: Magnifier icon used to open search.
 * - `LIBRARY`: Books/library icon for user collection.
 * - `FAVORITES`: Heart/star icon for favorites.
 * - `SETTINGS`: Cog icon for application settings.
 * - `USER`: Profile/user icon.
 * - `EXIT`: LogoutPage/exit icon.
 */
export enum SIDEBAR_ICON {
  SEARCH = 'search',
  LIBRARY = 'library',
  FAVORITES = 'favorites',
  SETTINGS = 'settings',
  USER = 'user',
  EXIT = 'exit',
}

/**
 * Function that maps an icon identifier to a rendered React element.
 *
 * @param icon - One of {@link SIDEBAR_ICON} values.
 * @returns A ReactElement representing the requested icon.
 */
export type IconSwitch = (icon: SIDEBAR_ICON) => ReactElement;

/**
 * Interface for SidebarIcon component props.
 *
 * @property icon - Icon to display. Needs to follow {@link SIDEBAR_ICON}.
 * @property isActive - Indicates whether the icon is active and should use an alternate style.
 */
export interface SidebarIconProps {
  icon: SIDEBAR_ICON;
  isActive: boolean;
}

/**
 * Component renders a single sidebar icon.
 *
 * @param props - The component properties:
 *  - `icon`: Icon identifier to render. See {@link SIDEBAR_ICON}.
 *  - `isActive`: If true, applies the active styling variant.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SidebarIcon icon={SIDEBAR_ICON.SEARCH} isActive={false} />
 * ```
 */
export type SidebarIcon = (props: SidebarIconProps) => ReactElement;
