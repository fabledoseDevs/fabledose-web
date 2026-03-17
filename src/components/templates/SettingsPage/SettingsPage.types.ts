import type { ChangeEvent, ReactElement } from 'react';

import type { Settings } from '@/contexts/SettingsContext.types';

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
 * @property settings - The user's settings object from the SettingsContext.
 * @property updateSettings - Function to update the user's settings.
 * @property displayName - The user's display name.
 * @property email - The user's email address.
 * @property isPasswordModalOpen - Flag indicating if the password modal is open.
 * @property currentPassword - The current password for password update.
 * @property newPassword - The new password for password update.
 * @property confirmNewPassword - The confirmation of the new password.
 * @property passwordModalFeedback - Feedback message for the password modal.
 * @property isPasswordUpdatePending - Flag indicating if a password update is pending.
 * @property planLabel - The label for the current user's plan.
 * @property updateUserEmail - Function to update the user's email address.
 * @property updateUserPassword - Function to update the user's password.
 * @property handleDisplayNameChange - Event handler for changing the display name.
 * @property handleDisplayNameBlur - Event handler for blurring the display name input.
 * @property handleEmailChange - Event handler for changing the email address.
 * @property handleEmailBlur - Event handler for blurring the email address input.
 * @property navigateToPlanPage - Function to navigate to the plan selection page.
 * @property openPasswordModal - Function to open the password modal.
 * @property closePasswordModal - Function to close the password modal.
 * @property handleCurrentPasswordChange - Event handler for changing the current password.
 * @property handleNewPasswordChange - Event handler for changing the new password.
 * @property handleConfirmNewPasswordChange - Event handler for changing the confirmation of the new password.
 * @property handlePasswordUpdate - Function to update the user's password.
 * @property handleFontSizeChange - Event handler for changing the font size.
 * @property handleFontFamilyChange - Event handler for changing the font family.
 * @property handleTextBackgroundChange - Event handler for changing the text background.
 * @property handleBackgroundIntensityChange - Event handler for changing the background intensity.
 * @property handleStoryLanguageChange - Event handler for changing the story language.
 * @property handleIllustrationAnimationChange - Event handler for changing the illustration animation.
 * @property handleAnimationQualityChange - Event handler for changing the animation quality.
 * @property handleNarrationChange - Event handler for changing the narration.
 * @property handleNarrationVolumeChange - Event handler for changing the narration volume.
 * @property handleBackgroundMusicChange - Event handler for changing the background music.
 * @property handleMusicVolumeChange - Event handler for changing the music volume.
 * @property handleNewsChange - Event handler for changing the news.
 * @property handlePaymentsChange - Event handler for changing the payments.
 * @property handleAnalyticalChange - Event handler for changing the analytical.
 * @property handleMarketingChange - Event handler for changing the marketing.
 '
 */
export interface UseSettingsPageReturnValues {
  activeTab: SETTINGS_TAB;
  setActiveTab: (tab: SETTINGS_TAB) => void;
  tabs: SETTINGS_TAB[];
  currentLang: string;
  displayLanguage: string;
  handleLanguageSelection: (selectedOption: string) => void;
  settings: Settings | null;
  displayName: string;
  email: string;
  isPasswordModalOpen: boolean;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  passwordModalFeedback: string;
  isPasswordUpdatePending: boolean;
  planLabel: string;
  updateSettings: (newSettings: Partial<Settings>) => void;
  updateUserEmail: (newEmail: string) => Promise<void>;
  updateUserPassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  handleDisplayNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDisplayNameBlur: () => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailBlur: () => void;
  navigateToPlanPage: () => void;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
  handleCurrentPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNewPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleConfirmNewPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordUpdate: () => Promise<void>;
  handleFontSizeChange: (value: number) => void;
  handleFontFamilyChange: (value: string) => void;
  handleTextBackgroundChange: (value: string) => void;
  handleBackgroundIntensityChange: (value: number) => void;
  handleStoryLanguageChange: (value: string) => void;
  handleIllustrationAnimationChange: (value: boolean) => void;
  handleAnimationQualityChange: (value: string) => void;
  handleNarrationChange: (value: boolean) => void;
  handleNarrationVolumeChange: (value: number) => void;
  handleBackgroundMusicChange: (value: boolean) => void;
  handleMusicVolumeChange: (value: number) => void;
  handleNewsChange: (value: boolean) => void;
  handlePaymentsChange: (value: boolean) => void;
  handleAnalyticalChange: (value: boolean) => void;
  handleMarketingChange: (value: boolean) => void;
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
