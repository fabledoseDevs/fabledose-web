import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the LogoutPage component.
 */

/**
 * Triggers navigation back to the previous route.
 *
 * @remarks
 * Used by the "Cancel" button on the LogoutPage.
 */
export type HandleCancel = () => void;

/**
 * Attempts to sign out the current user and then navigates to the home page.
 *
 * @remarks
 * Used by the "Logout" button on the LogoutPage. It should always redirect
 * to the main page even if the sign-out operation fails.
 */
export type HandleLogout = () => Promise<void>;

/**
 * Hook returning handlers used within LogoutPage.
 *
 * @returns Object with two functions:
 *  - `handleCancel`: {@link HandleCancel}
 *  - `handleLogout`: {@link HandleLogout}
 *  - `isLoggedOut`: A boolean flag set to `true` after a successful logout. When
 *    `true`, the UI should hide action buttons, show a success confirmation and
 *    schedule a redirect to the home page.
 */
export type useLogoutPage = () => {
  handleCancel: HandleCancel;
  handleLogout: HandleLogout;
  isLoggedOut: boolean;
};

/**
 * Component renders the LogoutPage.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <LogoutPage />
 * ```
 */
export type LogoutPage = () => ReactElement;
