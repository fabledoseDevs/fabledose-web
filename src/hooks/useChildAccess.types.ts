/**
 * Reactive availability for the active child.
 * @remarks Parents have unrestricted access. Loading profile data blocks discovery
 * until the selection is resolved. Time windows are application-level preferences,
 * evaluated against the browser clock in the stored IANA timezone, not server authorization.
 * @example
 * ```tsx
 * const access = useChildAccess();
 * const visible = stories.filter(story => access.canDiscover(story.id));
 * ```
 */
export interface ChildAccessResult {
  /** Whether profiles are still resolving. */
  loading: boolean;
  /** Whether the active profile is a child. */
  isChild: boolean;
  /** Whether this child is outside the permitted time window. */
  outsideHours: boolean;
  /** Checks exclusions for catalogue, search and favourites (hours do not hide the list). */
  canDiscover: (storyId: string) => boolean;
  /** Blocks direct story links and mounted players as well as exclusions. */
  reason: (storyId: string) => 'loading' | 'excluded' | 'hours' | null;
}
