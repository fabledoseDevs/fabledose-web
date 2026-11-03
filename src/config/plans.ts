import type { UserPlan } from '@/contexts/SettingsContext.types';

import type {
  AnimationQuality,
  PlanEntitlements,
  StoryAvailability,
} from './plans.types';

export const normalizeUserPlan = (value: unknown): UserPlan =>
  value === 'family' || value === 'ultimate' ? value : 'free';

export const normalizeStoryAvailability = (value: unknown): StoryAvailability =>
  value === 'subscription' || value === 'seasonal' ? value : 'selection';

export const getPlanEntitlements = (value: unknown): PlanEntitlements => {
  const plan = normalizeUserPlan(value);
  return {
    plan,
    parentalControl: plan !== 'free',
    ebooks: plan !== 'free',
    childProfileLimit: plan === 'ultimate' ? null : plan === 'family' ? 6 : 0,
  };
};

/** Animation and audiobook share catalogue access; resolution has separate plan limits. */
export const canAccessStory = (
  plan: unknown,
  availability?: StoryAvailability,
): boolean =>
  normalizeUserPlan(plan) !== 'free' ||
  normalizeStoryAvailability(availability) === 'selection';

/** Counts existing records, including deletion tombstones until cleanup completes. */
export const canCreateChildProfile = (
  plan: unknown,
  count: number,
): boolean => {
  const access = getPlanEntitlements(plan);
  return (
    access.parentalControl &&
    (access.childProfileLimit === null || count < access.childProfileLimit)
  );
};

/** Normalizes saved legacy values and applies the configured plan ceiling. */
export const getAnimationQuality = (
  plan: unknown,
  value: unknown,
): AnimationQuality => {
  const normalized = value === 'high' ? 'hd' : value;
  const quality =
    normalized === 'sd' || normalized === 'hd' || normalized === '2k'
      ? normalized
      : 'auto';
  if (quality === 'auto' || quality === 'sd') return quality;
  if (normalizeUserPlan(plan) === 'free') return 'sd';
  if (quality === '2k' && normalizeUserPlan(plan) !== 'ultimate') return 'hd';
  return quality;
};

/** Identical plan-aware controls in account settings and the reader popup. */
export const getAnimationQualityOptions = (
  plan: unknown,
): { label: string; value: AnimationQuality; isDisabled: boolean }[] => [
  { label: 'AUTO', value: 'auto', isDisabled: false },
  { label: 'SD', value: 'sd', isDisabled: false },
  { label: 'HD', value: 'hd', isDisabled: normalizeUserPlan(plan) === 'free' },
  {
    label: '2K',
    value: '2k',
    isDisabled: normalizeUserPlan(plan) !== 'ultimate',
  },
];

/** Resolves to real 720p/1080p assets. AUTO never exceeds the plan ceiling. */
export const getAnimationMediaProfile = (
  plan: unknown,
  value: unknown,
  compact: boolean,
): 'mobile' | 'desktop' => {
  const quality = getAnimationQuality(plan, value);
  if (normalizeUserPlan(plan) === 'free' || quality === 'sd') return 'mobile';
  return quality === 'auto' && compact ? 'mobile' : 'desktop';
};
