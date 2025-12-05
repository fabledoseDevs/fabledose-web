import type { ReactElement } from 'react';

import type { DictionaryType } from '@/lang/lang.types';

/**
 * @module
 * This file defines the types and interfaces for the RegisterPage component.
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
 * <RegisterPage />
 * ```
 */

/**
 * Props for Maintenance component
 */
export interface MaintenanceProps {
  dict: DictionaryType['maintenance'];
}

/**
 * RegisterPage component type definition
 */
export type Maintenance = (props: MaintenanceProps) => ReactElement;
