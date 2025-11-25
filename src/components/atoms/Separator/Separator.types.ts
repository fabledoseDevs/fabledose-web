import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the Separator component.
 */

/**
 * Possible color variants for the separator line.
 *
 * @remarks
 * - `WHITE`: Pure white line.
 * - `GRAY`: Neutral/gray-like line (implemented with white alpha in theme).
 * - `PURPLE`: Brand purple line.
 */
export enum SEPARATOR_COLOR {
  WHITE = 'white',
  GRAY = 'gray',
  PURPLE = 'purple',
}

/**
 * Props for the Separator component.
 *
 * @property color - Color variant of the separator line. One of {@link SEPARATOR_COLOR}.
 * @property label - Optional text label displayed centered between two lines.
 */
export interface SeparatorProps {
  color: SEPARATOR_COLOR;
  label?: string;
}

/**
 * Component renders a horizontal separator line spanning full width. When a
 * `label` is provided, it renders line — label — line in a single row with the
 * label centered.
 *
 * @param props - The component properties:
 *  - `color`: Color variant for the line. Must follow {@link SEPARATOR_COLOR}.
 *  - `label`: Optional centered label text.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Separator color={SEPARATOR_COLOR.GRAY} />
 * <Separator color={SEPARATOR_COLOR.PURPLE} label="or" />
 * ```
 */
export type Separator = (props: SeparatorProps) => ReactElement;
