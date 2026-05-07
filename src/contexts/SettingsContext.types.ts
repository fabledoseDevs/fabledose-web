import type { ReactElement, ReactNode } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the SettingsContext.
 */

/**
 * Defines the structure for a user's settings.
 * This interface contains all the customizable options available to the user.
 *
 * @property displayName - The user's public display name.
 * @property email - The user's email address.
 * @property password - Password placeholder persisted in settings document.
 * @property parentalControl - State of the parental control feature.
 * @property fontSize - The preferred font size for reading content, in pixels.
 * @property fontFamily - The preferred font family for reading content.
 * @property textBackground - The preferred text background color for reading content.
 * @property backgroundIntensity - The preferred background intensity for reading content.
 * @property storyLanguage - The preferred language for story content.
 * @property illustrationAnimation - State of the illustration animation feature.
 * @property animationQuality - The preferred quality level for animations.
 * @property narration - State of the narration feature.
 * @property narrationVolume - The preferred volume level for narration.
 * @property backgroundMusic - State of the background music feature.
 * @property musicVolume - The preferred volume level for background music.
 * @property notificationsNews - State of news notifications.
 * @property notificationsPayments - State of payment notifications.
 * @property cookiesAnalytical - State of analytical cookies consent.
 * @property cookiesMarketing - State of marketing cookies consent.
 */
export interface Settings {
  displayName: string;
  email: string;
  password: string;
  plan: UserPlan;
  parentalControl: boolean;
  fontSize: number;
  fontFamily: FableFontFamily;
  textBackground: string;
  backgroundIntensity: number;
  storyLanguage: string;
  illustrationAnimation: boolean;
  animationQuality: string;
  narration: boolean;
  narrationVolume: number;
  backgroundMusic: boolean;
  musicVolume: number;
  notificationsNews: boolean;
  notificationsPayments: boolean;
  cookiesAnalytical: boolean;
  cookiesMarketing: boolean;
}

export type UserPlan = 'free' | 'family' | 'ultimate';
export type FableFontFamily = 'sans' | 'serif' | 'dyslexic';

/**
 * Defines the shape of the SettingsContext.
 *
 * @property settings - The current user's settings object. Null if no user is logged in.
 * @property updateSettings - A function to update one or more settings. It accepts a partial Settings object.
 * @property updateUserEmail - A function to securely update the user's email with verification.
 * @property updateUserPassword - A function to reauthenticate and update the user's password.
 */
export interface SettingsContextType {
  settings: Settings | null;
  updateSettings: (newSettings: Partial<Settings>) => void;
  refreshPlanFromFirebase: () => Promise<UserPlan>;
  updateUserEmail: (newEmail: string) => Promise<void>;
  updateUserPassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
}

/**
 * Interface for the SettingsProvider component's props.
 *
 * @property children - The child components that will have access to the SettingsContext.
 */
export interface SettingsProviderProps {
  children: ReactNode;
}

/**
 * Type definition for the `useSettings` hook.
 * This hook provides access to the settings context.
 *
 * @returns The settings context, containing the current settings and an update function.
 * @throws Will throw an error if used outside of a `SettingsProvider`.
 */
export type UseSettings = () => SettingsContextType;

/**
 * Type definition for the `SettingsProvider` component.
 * This component provides the settings context to its children.
 *
 * @param props - The properties for the provider, including its children.
 * @returns A React element that provides the settings context.
 */
export type SettingsProvider = (props: SettingsProviderProps) => ReactElement;
