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
 * @property parentalControl - State of the parental control feature.
 * @property fontSize - The preferred font size for reading content, in pixels.
 * @property storyLanguage - The preferred language for story content.
 */
export interface Settings {
  displayName: string;
  parentalControl: boolean;
  fontSize: number;
  storyLanguage: string;
}

/**
 * Defines the shape of the SettingsContext.
 *
 * @property settings - The current user's settings object. Null if no user is logged in.
 * @property updateSettings - A function to update one or more settings. It accepts a partial Settings object.
 */
export interface SettingsContextType {
  settings: Settings | null;
  updateSettings: (newSettings: Partial<Settings>) => void;
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
