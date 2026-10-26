import type { ReactElement } from 'react';
/**
 * @module
 * Library synchronization feedback.
 *
 * Defines contracts shared by the library UI and its session-aware persistence layer.
 */

/**
 * Localized status text and an optional explicit retry action.
 *
 * @remarks
 * Use isError for actionable failures and floating inside the reader. Supply retryLabel whenever onRetry is present; the component does not translate strings itself.
 *
 * @example
 * ```tsx
 * <SyncStatus message="Could not save progress" isError onRetry={retry} retryLabel="Try again" />
 * ```
 */
export interface SyncStatusProps {
  /** Already localized status or failure message. */
  message: string;
  /** Uses an assertive alert instead of a polite status; defaults to false. */
  isError?: boolean;
  /** Positions feedback above reader controls; defaults to false. */
  floating?: boolean;
  /** Optional callback that repeats the failed operation. */
  onRetry?: () => void;
  /** Localized visible label required when rendering a retry action. */
  retryLabel?: string;
}
/**
 * Renders persistent synchronization feedback and an optional retry button.
 *
 * @param props - Localized message, severity, positioning and retry configuration.
 * @returns Accessible status or alert content.
 * @group Component
 * @example
 * ```tsx
 * <SyncStatus message="Saving progress…" floating />
 * ```
 */
export type SyncStatus = (props: SyncStatusProps) => ReactElement;
