import type { ReactElement } from 'react';

/**
 * Compact circular trigger for the shared parent/child profile selection dialog.
 *
 * @remarks
 * Renders the active child's bundled avatar, or the first Unicode character of
 * the parent's display name from SettingsContext. A localized parent label is
 * used until a display name is available. The full name remains in the accessible
 * button label. The control has a fixed 44px touch target on mobile and desktop.
 * Requires ChildProfilesProvider, SettingsProvider and DictionaryProvider.
 * Returns null while profiles load or the account is signed out.
 *
 * @group Component
 * @example
 * ```tsx
 * <ProfilePicker />
 * ```
 */
export type ProfilePicker = () => ReactElement | null;
