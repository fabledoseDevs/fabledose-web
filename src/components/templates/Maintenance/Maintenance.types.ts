import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the Maintenance component.
 */

/**
 * Component renders a maintenance page for the application.
 * The maintenance page includes:
 * - Jumbotron with headline about planned release
 * - Informational paragraph about the site being under construction
 * - Button linking to a demo site
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Maintenance />
 * ```
 */

/**
 * Maintenance component type definition
 */
export type Maintenance = () => ReactElement;
