import type { ReactElement } from 'react';

/**
 * Compact per-story availability menu for child profiles.
 * @remarks Visible in parent mode; uses the shared controlled SettingsSwitch.
 * Writes one child exclusion at a time and reflects acknowledged profile snapshots.
 * The menu is an ordinary Spark preference editor, not PIN authorization.
 * @example
 * ```tsx
 * <StoryAccessControl storyId="goldilocks" />
 * ```
 */
export interface StoryAccessControlProps {
  /** Stable catalogue identifier, independent of the locale slug. */
  storyId: string;
}
/** Returns a menu or null when signed out or a child profile is selected. */
export type StoryAccessControl = (
  props: StoryAccessControlProps,
) => ReactElement | null;
