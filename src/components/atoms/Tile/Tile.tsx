import { TileBody } from './Tile.styled';
import type { Tile as TileType } from './Tile.types';

export const Tile: TileType = ({ image, imageAlt }) => (
  <TileBody src={image} alt={imageAlt} width={250} height={500} />
);
