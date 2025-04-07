/**
 * This component renders grid of 2 or 4 Tile components.
 *
 * Example usage:
 * ```tsx
 * <TileWindow
 *    defaultTiles={[
 *       {
 *         image: '/mockImages/mock_Tile_goldilock.jpg',
 *         imageAlt: 'Placeholder Image 1',
 *       },
 *       {
 *         image: '/mockImages/mock_Tile_wife.jpg',
 *         imageAlt: 'Placeholder Image 2',
 *       },
 *     ]}
 *     extendedTiles={[
 *       {
 *         image: '/mockImages/mock_Tile_piggy.jpg',
 *         imageAlt: 'Placeholder Image 3',
 *       },
 *       {
 *         image: '/mockImages/mock_Tile_bear.jpg',
 *         imageAlt: 'Placeholder Image 4',
 *        },
 *     ]}
 * />
 *```
 *
 */

import type { ReactElement } from 'react';

import type { TileProps } from '@/atoms/Tile';

export interface TileWindowProps {
  /**
   *  Required tiles for the tile window.
   */
  defaultTiles: [TileProps, TileProps];
  /**
   * Optional extended tiles for the tile window.
   * If provided, the tile window will display 4 tiles instead of 2.
   */
  extendedTiles?: [TileProps, TileProps];
}

/**
 * @group Components
 */
export type TileWindow = (props: TileWindowProps) => ReactElement;
