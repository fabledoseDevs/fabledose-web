import type { ReactElement } from 'react';

/**
 * Public pre-launch screen with the planned Q1 2027 release and Fabledose logo.
 * @remarks There is no demo invitation or public call to action. The homepage
 * retains a discreet trigger that opens the shared-password preview dialog.
 * The server validates preview access and remembers it for 48 hours.
 * @example
 * ```tsx
 * <Maintenance />
 * ```
 */
export type Maintenance = () => ReactElement;
