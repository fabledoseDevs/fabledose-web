/**
 * This component renders a tile: a rectangular area that contains image.
 *
 * Example usage:
 * ```tsx
 * <Tile
 *   image="path/to/image.jpg"
 *   imageAlt="Description of the image"
 * />
 * ```
 */

import type { ReactElement } from 'react';

export interface TileProps {
  /**
   * Image to display on the tile.
   */
  image: string;
  /**
   * Alt text for the image.
   */
  imageAlt: string;
}

/**
 * @group Components
 */
export type Tile = (props: TileProps) => ReactElement;
