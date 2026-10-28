import type { ReactElement } from 'react';

import type { ChildProfile } from '@/config/childProfiles.types';

/**
 * Per-child same-day access-hours editor.
 * @remarks Persists schedule/timezone transactionally without overwriting exclusions.
 * Changes remain ordinary account-owned Spark preferences, not a PIN-protected session.
 * @example
 * ```tsx
 * <ProfileHours profile={child} onClose={close} />
 * ```
 */
export interface ProfileHoursProps {
  /** Child being edited. */
  profile: ChildProfile;
  /** Dismisses after acknowledged save or cancellation. */
  onClose: () => void;
}
/** Component contract for the localized profile-hours dialog. */
export type ProfileHours = (props: ProfileHoursProps) => ReactElement;
