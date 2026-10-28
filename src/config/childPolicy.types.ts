/**
 * @module
 * Spark-compatible child content preferences; not PIN authorization.
 */

/**
 * One same-day window, with an exclusive end time.
 * @remarks Disabled days have no allowed hours when scheduling is enabled.
 * Overnight ranges are rejected; start must precede end.
 * @example
 * ```ts
 * const window: ChildAccessWindow = { enabled: true, start: '09:00', end: '19:00' };
 * ```
 */
export interface ChildAccessWindow {
  /** Whether this category of days permits access. */
  enabled: boolean;
  /** Inclusive local start, HH:mm. */
  start: string;
  /** Exclusive local end, HH:mm. */
  end: string;
}

/**
 * Persisted per-child story exclusions and access schedule.
 * @remarks
 * The signed-in parent owns these preferences on Spark. The ordinary application
 * respects them, but changing profiles, browser time or direct public asset access
 * is not securely prevented. Never store PINs here.
 * @example
 * ```ts
 * const policy: ChildPolicy = { excludedStories: ['goldilocks'], scheduleEnabled: false,
 * timeZone: 'Europe/Warsaw', weekdays: { enabled: true, start: '09:00', end: '19:00' },
 * weekends: { enabled: true, start: '09:00', end: '20:00' } };
 * ```
 */
export interface ChildPolicy {
  /** Stable catalogue IDs hidden from this child's discovery views. */
  excludedStories: string[];
  /** False disables time limits, preserving story exclusions. */
  scheduleEnabled: boolean;
  /** IANA time zone used consistently across devices, including DST. */
  timeZone: string;
  /** Monday–Friday local schedule. */
  weekdays: ChildAccessWindow;
  /** Saturday–Sunday local schedule. */
  weekends: ChildAccessWindow;
}
