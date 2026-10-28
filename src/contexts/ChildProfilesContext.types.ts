import type { ReactNode } from 'react';

import type { ChildPolicy } from '@/config/childPolicy.types';
import type {
  ChildProfile,
  ChildProfileDraft,
} from '@/config/childProfiles.types';

/**
 * Account-owned profiles and the device-local active library identity.
 * @remarks
 * Null activeProfileId means the parent library. Selection is stored per UID in
 * localStorage, never in a global cookie. Account changes invalidate old requests.
 * PIN authorization is a separate server feature; Spark preferences do not authorize a parent session.
 * @example
 * ```tsx
 * const { profiles, selectProfile } = useChildProfiles();
 * <button onClick={() => selectProfile(profiles[0].id)}>Select child</button>
 * ```
 */
export interface ChildProfilesContextValue {
  /** Current account UID, null when signed out. */
  userId: string | null;
  /** Validated profile documents, including tombstones awaiting cleanup. */
  profiles: ChildProfile[];
  /** Selected child ID, or null for the parent. */
  activeProfileId: string | null;
  /** Increments on each library switch, including A → B → A. */
  revision: number;
  /** True until authentication and the first profile snapshot resolve. */
  loading: boolean;
  /** True during an acknowledged profile mutation. */
  saving: boolean;
  /** Load or mutation failure; no optimistic success is shown. */
  error: boolean;
  /** Reopens the profile subscription after a failed load. */
  retry: () => void;
  /** Selects an existing, non-deleting profile or the parent. */
  selectProfile: (id: string | null) => void;
  /** Persists an editor draft. Returns false on failure. */
  saveProfile: (draft: ChildProfileDraft, id?: string) => Promise<boolean>;
  /** Deletes only the given child's library; retry resumes partial cleanup. */
  /** Updates one story exclusion without overwriting schedule or other exclusions. */
  setStoryAvailable: (
    id: string,
    storyId: string,
    available: boolean,
  ) => Promise<boolean>;
  /** Changes hours/timezone while retaining concurrent story exclusions. */
  saveSchedule: (
    id: string,
    schedule: Omit<ChildPolicy, 'excludedStories'>,
  ) => Promise<boolean>;
  removeProfile: (id: string) => Promise<boolean>;
}

/**
 * Provider properties.
 * @remarks Mount once above all library consumers.
 * @example
 * ```tsx
 * <ChildProfilesProvider>{children}</ChildProfilesProvider>
 * ```
 */
export interface ChildProfilesProviderProps {
  /** Application subtree sharing profile selection. */
  children: ReactNode;
}
