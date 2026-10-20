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
 * This component allows users to view, select, add, and remove child profiles.
 * Removal requires confirmation. Removing the active profile selects the first remaining
 * entry; removing the last profile clears the active-profile cookie.
 * Profile records currently exist in component state only; changes do not persist across reloads.
 * Profiles are displayed with their avatars and names, and the active profile is highlighted.
 * The creation dialog uses a viewport-constrained name input and a compact avatar grid
 * without a separate scroll area; short viewports scroll the dialog content only.
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
