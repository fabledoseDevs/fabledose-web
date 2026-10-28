import type { ChildAccessWindow, ChildPolicy } from './childPolicy.types';

export const defaultChildPolicy = (): ChildPolicy => ({
  excludedStories: [],
  scheduleEnabled: false,
  timeZone: 'Europe/Warsaw',
  weekdays: { enabled: true, start: '09:00', end: '19:00' },
  weekends: { enabled: true, start: '09:00', end: '20:00' },
});
const validTime = (value: unknown): value is string =>
  typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
const normalizeWindow = (value: ChildAccessWindow): ChildAccessWindow => {
  if (
    !value ||
    typeof value.enabled !== 'boolean' ||
    !validTime(value.start) ||
    !validTime(value.end) ||
    value.start >= value.end
  )
    throw new Error('Invalid access window');
  return { enabled: value.enabled, start: value.start, end: value.end };
};
/** Validates schedules, timezone and catalogue IDs without relying on the UI. */
export const normalizeChildPolicy = (value?: ChildPolicy): ChildPolicy => {
  if (value === undefined) return defaultChildPolicy();
  if (
    !value ||
    !Array.isArray(value.excludedStories) ||
    value.excludedStories.length > 1000 ||
    value.excludedStories.some(
      id => typeof id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(id),
    ) ||
    typeof value.scheduleEnabled !== 'boolean' ||
    typeof value.timeZone !== 'string' ||
    value.timeZone.length > 100
  )
    throw new Error('Invalid child policy');
  new Intl.DateTimeFormat('en-US', { timeZone: value.timeZone }).format(
    new Date(0),
  );
  return {
    excludedStories: [...new Set(value.excludedStories)],
    scheduleEnabled: value.scheduleEnabled,
    timeZone: value.timeZone,
    weekdays: normalizeWindow(value.weekdays),
    weekends: normalizeWindow(value.weekends),
  };
};

/** Returns the reason this child cannot open a story; null means allowed. */
export const childAccessReason = (
  policy: ChildPolicy,
  storyId: string,
  now: Date,
): 'excluded' | 'hours' | null => {
  if (policy.excludedStories.includes(storyId)) return 'excluded';
  if (!policy.scheduleEnabled) return null;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: policy.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const part = (type: string) =>
    parts.find(item => item.type === type)?.value || '';
  const window = ['Sat', 'Sun'].includes(part('weekday'))
    ? policy.weekends
    : policy.weekdays;
  const time = `${part('hour')}:${part('minute')}`;
  return window.enabled && time >= window.start && time < window.end
    ? null
    : 'hours';
};
