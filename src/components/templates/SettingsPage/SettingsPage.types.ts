import type { ReactElement } from 'react';

/**
 * @file
 * This file defines the types and interfaces for SettingsPage component.
 *
 * The SettingsPage displays a two-column layout for desktop with a menu on the left
 * and content on the right.
 *
 * Example usage:
 * ```tsx
 * <SettingsPage />
 * ```
 */

/**
 * Enum for SettingsPage subcategories.
 *
 * @remarks
 * - `PROFILE_N_ACCOUNT`: Profile and account settings.
 * - `PARENTAL_CONTROL`: Parental control settings.
 * - `DISPLAY_N_AUDIO`: Display and audio settings.
 * - `NOTIFICATIONS`: Notification settings.
 * - `PRIVACY_N_DATA`: Privacy and data settings.
 * - `SUPPORT_N_FEEDBACK`: Support and feedback.
 * - `INFO`: Information about the application.
 */
export enum SETTINGS_TAB {
  PROFILE_N_ACCOUNT = 'profile_n_account',
  PARENTAL_CONTROL = 'parental_control',
  DISPLAY_N_AUDIO = 'display_n_audio',
  NOTIFICATIONS = 'notifications',
  PRIVACY_N_DATA = 'privacy_n_data',
  SUPPORT_N_FEEDBACK = 'support_n_feedback',
  INFO = 'info',
}

/**
 * Interface for return values of useSettingsPage hook.
 *
 * @property activeTab - Currently selected settings tab.
 * @property setActiveTab - Function to change the active settings tab.
 */
export interface UseSettingsPageReturnValues {
  activeTab: SETTINGS_TAB;
  setActiveTab: (tab: SETTINGS_TAB) => void;
}

/**
 * Hook for managing SettingsPage state.
 */
export type UseSettingsPage = () => UseSettingsPageReturnValues;

/**
 * Component renders SettingsPage.
 * @group Components
 */
export type SettingsPage = () => ReactElement;
