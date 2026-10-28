import type { ReactElement } from 'react';

/**
 * Persistent child-profile manager and profile picker.
 * @remarks
 * Uses ChildProfilesProvider. Changes are acknowledged by Firestore; names and avatars
 * are validated, deletion requires confirmation and removes the child's library.
 * The parent option preserves all library entries created before profiles existed.
 * This component does not imply PIN-based authorization, which requires server support.
 * @example
 * ```tsx
 * <SettingsProfiles />
 * <SettingsProfiles selectionOnly />
 * ```
 */
export type SettingsProfiles = (props: SettingsProfilesProps) => ReactElement;

/**
 * Presentation options for the shared manager.
 * @remarks The picker can hide mutation controls while preserving profile selection.
 * @example
 * ```ts
 * const props: SettingsProfilesProps = { selectionOnly: true };
 * ```
 */
export interface SettingsProfilesProps {
  /** Show only parent/child selection, without nested editor modals. */
  selectionOnly?: boolean;
  /** Invoked after a selection, e.g. to close a picker dialog. */
  onSelect?: () => void;
}

/** Localized labels used by the profile manager, picker and moderation placeholder. */
export interface ChildProfilesText {
  title: string;
  parent: string;
  add: string;
  edit: string;
  remove: string;
  createTitle: string;
  editTitle: string;
  name: string;
  placeholder: string;
  avatar: string;
  age: string;
  unspecified: string;
  cancel: string;
  save: string;
  confirmTitle: string;
  confirmBody: string;
  loading: string;
  saving: string;
  error: string;
  retry: string;
  empty: string;
  signIn: string;
  pick: string;
  close: string;
  deleting: string;
  parentalDeferred: string;
  legacy: string;
  noAvailableStories: string;
  availability: string;
  available: string;
  excluded: string;
  hours: string;
  scheduleEnabled: string;
  weekdays: string;
  weekends: string;
  allowedDay: string;
  start: string;
  end: string;
  timeZone: string;
  scheduleHint: string;
  blockedExcluded: string;
  blockedHours: string;
  unprotected: string;
  policyError: string;
  backLibrary: string;
}
