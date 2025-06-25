import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for a FableTile component.
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
 * The FableTile displays a small, interactive cover for a fable.
 *
 * @param props - The component properties:
 *  - `imageUrl`: Source (url address) for fable cover image.
 *  - `fableTitle`: Title of fable for alts and other purposes.
 *  - `fableId`: ID string to construct url leading to fable content.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <FableTile
 *   imageUrl={mockImageOne.src}
 *   fableTitle={'Złotowłosa'}
 *   fableId={'zlotowlosa-i-trzy-misie'}
 * />
 * ```
 */
export type FableTile = (props: FableTileProps) => ReactElement;
