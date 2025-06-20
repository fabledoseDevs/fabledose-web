import type { ReactElement } from 'react';

/**
 * @file
 * This file defines the types and interfaces for a FableTile component.
 *
 * The FableTile displays a small, interactive cover for a fable.
 *
 * Example usage:
 * ```tsx
 * <FableTile
 *   imageUrl={mockImageOne.src}
 *   fableTitle={'Złotowłosa'}
 *   fableId={'zlotowlosa-i-trzy-misie'}
 * />
 * ```
 */

/**
 * Interface for FableTile component props.
 *
 * @property imageUrl - Source (url address) for fable cover image.
 * @property fableTitle - Title of fable for alts and other purposes.
 * @property fableId - ID string to construct url leading to fable content.
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
