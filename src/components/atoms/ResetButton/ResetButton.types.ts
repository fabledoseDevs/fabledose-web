import type { ReactElement } from 'react';

/**
 * @module
 * Restart reading control.
 *
 * Defines contracts shared by the library UI and its session-aware persistence layer.
 */

/**
 * Properties for a circular restart control with a localized tooltip.
 *
 * @remarks
 * The control stays 54 pixels wide while idle, hovered, focused or pending. It disables repeated clicks until onClick settles. The parent owns save failures and retry feedback.
 *
 * @example
 * ```tsx
 * <ResetButton onClick={resetProgress} label="Read again" />
 * ```
 */
export interface ResetButtonProps {
  /** Restart action; an asynchronous callback should settle after persistence acknowledges the reset. */
  onClick: () => void | Promise<void>;
  /** Optional localized action name overriding label for the tooltip and accessible name. */
  title?: string;
  /** Localized tooltip and accessible name; defaults to Czytaj od nowa. */
  label?: string;
}

/**
 * Renders a fixed circular restart action with hover and keyboard-focus feedback.
 *
 * @param props - Persistence callback and localized tooltip text.
 * @returns A restart button and its contextual tooltip.
 * @group Component
 * @example
 * ```tsx
 * <ResetButton onClick={resetProgress} label="Read again" />
 * ```
 */
export type ResetButton = (props: ResetButtonProps) => ReactElement;
