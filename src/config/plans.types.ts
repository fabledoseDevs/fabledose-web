import type { UserPlan } from '@/contexts/SettingsContext.types';

/**
 * Catalogue membership, independent of a story's language or rendering quality.
 * @remarks Omitted metadata defaults to selection for backwards compatibility.
 * Current stories all belong to selection. Seasonal/subscription stories require
 * Family or Ultimate; animation and audiobook permissions follow the same story.
 * @example
 * ```ts
 * const availability: StoryAvailability = 'selection';
 * ```
 */
export type StoryAvailability = 'selection' | 'subscription' | 'seasonal';

/** Features that can open the shared upgrade explanation. */
export type PlanFeature = 'story' | 'ebooks' | 'parental' | 'profiles';

/**
 * Resolved feature permissions for the configured account plan.
 * @remarks These are application entitlements, not payment verification or secure
 * media delivery. Unknown plans resolve to Free. Null profile limit means unlimited.
 * @example
 * ```ts
 * const access: PlanEntitlements = { plan: 'family', parentalControl: true, ebooks: true, childProfileLimit: 6 };
 * ```
 */
export interface PlanEntitlements {
  /** Normalized account plan. */
  plan: UserPlan;
  /** Whether child profiles, exclusions and schedules are enabled. */
  parentalControl: boolean;
  /** Whether PDF/EPUB downloads are permitted when a file exists. */
  ebooks: boolean;
  /** Zero for Free, six for Family, null for Ultimate. */
  childProfileLimit: number | null;
}

/**
 * Saved animation preference shared by account settings and the story reader.
 * @remarks AUTO follows viewport size within the plan ceiling. SD uses 720p;
 * HD uses 1080p. Ultimate-only 2K currently uses the same 1080p assets until
 * dedicated QHD animations are supplied. Removed 4K preferences migrate to AUTO.
 * @example
 * ```ts
 * const quality: AnimationQuality = 'auto';
 * ```
 */
export type AnimationQuality = 'auto' | 'sd' | 'hd' | '2k';
