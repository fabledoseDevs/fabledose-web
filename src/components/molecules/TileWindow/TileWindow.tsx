import Tile from '@/atoms/Tile';

import { TileWindowBody, TileWindowRow } from './TileWindow.styled';
import type { TileWindow as TileWindowType } from './TileWindow.types';

export const TileWindow: TileWindowType = ({ defaultTiles, extendedTiles }) => (
  <TileWindowBody>
    <TileWindowRow>
      <Tile image={defaultTiles[0].image} imageAlt={defaultTiles[0].imageAlt} />
      <Tile image={defaultTiles[1].image} imageAlt={defaultTiles[1].imageAlt} />
    </TileWindowRow>

    {extendedTiles && (
      <TileWindowRow>
        <Tile
          image={extendedTiles[0].image}
          imageAlt={extendedTiles[0].imageAlt}
        />
        <Tile
          image={extendedTiles[1].image}
          imageAlt={extendedTiles[1].imageAlt}
        />
      </TileWindowRow>
    )}
  </TileWindowBody>
);
