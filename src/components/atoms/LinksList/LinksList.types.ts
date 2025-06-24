import type { ReactElement } from 'react';

/**
 * @file
 * This file defines the types and interfaces for the LinksList component.
 *
 * The LinksList component can display links in different variants and layouts,
 * with optional icons and customizable styling.
 *
 * Example usage:
 * ```tsx
 * <LinksList
 *   variant={LINK_VARIANT.ICON}
 *   layout={LIST_LAYOUT.VERTICAL}
 *   title={'Obserwuj nas na SM'}
 *   links={[
 *     {href: 'https://facebook.com', label: 'Facebook', icon: 'path/to/icon/facebook.svg'},
 *     {href: 'https://instagram.com', label: 'Instagram', icon: 'path/to/icon/insta.svg'},
 *     {href: 'https://x.com', label: 'X', icon: 'path/to/icon/x.svg'},
 *   ]}
 * />
 * ```
 */

/**
 * Possible display variants for links in the list.
 *
 * @remarks
 * - `ICON`: Displays links with icons and labels.
 * - `TEXT`: Displays links as text only without icons.
 */
export enum LINK_VARIANT {
  ICON = 'icon',
  TEXT = 'text',
}

/**
 * Possible layout orientations for the links list.
 *
 * @remarks
 * - `HORIZONTAL`: Arranges links in a horizontal row.
 * - `VERTICAL`: Arranges links in a vertical column.
 */
export enum LIST_LAYOUT {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

/**
 * Interface representing a single link item in the list.
 *
 * @property href - The URL or path the link points to.
 * @property label - The display text for the link.
 * @property icon - Optional path to an icon file for the link.
 */
export interface LinkItem {
  href: string;
  label: string;
  icon?: string;
}

/**
 * Interface for LinksList component props.
 *
 * @property variant - Defines the display variant of the links:
 *  - `LINK_VARIANT.ICON`
 *  - `LINK_VARIANT.TEXT`
 * @property layout - Defines the layout orientation:
 *  - `LIST_LAYOUT.HORIZONTAL`
 *  - `LIST_LAYOUT.VERTICAL`
 * @property links - Array of link items to display.
 * @property title - Optional title displayed above the links list.
 */
export interface LinksListProps {
  variant: LINK_VARIANT;
  layout: LIST_LAYOUT;
  links: LinkItem[];
  title?: string;
}

/**
 * @group Components
 */
export type LinksList = (props: LinksListProps) => ReactElement;
