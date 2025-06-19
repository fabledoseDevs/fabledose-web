import type { ReactElement } from 'react';

/**
 * @file
 * This file defines the types and interfaces for FableTile component.
 *
 * The FableTile have following properites.
 *
 * Example usage:
 * ```tsx
 * <FableTile />
 * ```
 */

/**
 * Interface for FableTile component props.
 *
 * @property imageUrl - Lorem ipsum...
 * @property fableTitle - Sit amet...
 */
export interface FableTileProps {
  imageUrl: string;
  fableTitle: string;
  fableId: string;
}

/**
 * @group Components
 */
export type FableTile = (props: FableTileProps) => ReactElement;
