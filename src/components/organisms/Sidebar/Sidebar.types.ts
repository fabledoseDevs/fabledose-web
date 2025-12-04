import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the Sidebar component.
 * The Sidebar is a responsive navigation element and currently does not accept
 * any runtime props. This interface is reserved for future extensibility.
 */

/**
 * Component renders the application Sidebar.
 *
 * The Sidebar is fixed to the left on larger screens and to the bottom on
 * mobile devices. It composes internal menus and icons for navigation.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Sidebar />
 * ```
 */
export type Sidebar = () => ReactElement;
