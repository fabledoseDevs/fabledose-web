import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the SettingsProfiles component.
 */

/**
 * Interface representing a user profile.
 *
 * @property id - Unique identifier for the profile.
 * @property name - Display name of the profile.
 * @property imageUrl - URL of the profile's avatar image.
 */
export interface Profile {
  id: string;
  name: string;
  imageUrl: string;
}

/**
 * Component renders SettingsProfiles.
 * This component allows users to view, select, and add new child profiles.
 * Profiles are displayed with their avatars and names, and the active profile is highlighted.
 * @param props - The component properties.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SettingsProfiles />
 * ```
 */
export type SettingsProfiles = () => ReactElement;
