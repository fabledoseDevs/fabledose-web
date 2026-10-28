/**
 * @module
 * Account session ownership.
 *
 * Defines contracts shared by the library UI and its session-aware persistence layer.
 */

/**
 * Identifies one authenticated login, including repeated logins to the same UID.
 *
 * @remarks
 * Compare login and profile fields; UID alone cannot distinguish an old request after A → B → A.
 *
 * @example
 * ```ts
 * const session: AccountSession = { uid: user.uid, epoch: 1, profileId: null, scopeEpoch: 0 };
 * ```
 */
export interface AccountSession {
  /** Firebase UID owning this login. */
  uid: string;
  /** Monotonic login identifier that changes even when the same UID returns. */
  epoch: number;
  /** Child library identity; null selects the legacy parent library. */
  profileId: string | null;
  /** Profile-selection revision, preventing stale A → B → A responses. */
  scopeEpoch: number;
}
/**
 * Captures and validates ownership of asynchronous account operations.
 *
 * @remarks
 * Capture before starting a request and validate before applying its result. A null capture means that no matching authenticated session is active.
 *
 * @example
 * ```ts
 * const session = guard.capture();
 * if (guard.isCurrent(session)) applyResult();
 * ```
 */
export interface AccountSessionGuard {
  /** Authentication and profile revision used to refresh dependent hooks. */
  revision: number;
  /** Returns the matching active session, or null when the owner is not authenticated. */
  capture: () => AccountSession | null;
  /** Checks that a captured session still belongs to this mounted consumer. */
  isCurrent: (session: AccountSession | null) => boolean;
}
