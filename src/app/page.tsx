'use client';
import type { ReactElement } from 'react';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_COLOR,
  BUTTON_SIZE,
} from '@/atoms/Button/Button.types';
import TileWindow from '@/molecules/TileWindow';

const Home = (): ReactElement => (
  <>
    <h1>Poltawski Test</h1>
    <p>Lato regular test</p>
    <Button
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      variant={BUTTON_SIZE.DEFAULT}
      color={BUTTON_COLOR.CORAL}
      text="Hello World"
      payload={() => console.info('Hello World')}
    />
    <TileWindow
      defaultTiles={[
        {
          image: '/mockImages/mock_Tile_goldilock.jpg',
          imageAlt: 'Placeholder Image 1',
        },
        {
          image: '/mockImages/mock_Tile_wife.jpg',
          imageAlt: 'Placeholder Image 2',
        },
      ]}
      extendedTiles={[
        {
          image: '/mockImages/mock_Tile_piggy.jpg',
          imageAlt: 'Placeholder Image 3',
        },
        {
          image: '/mockImages/mock_Tile_bear.jpg',
          imageAlt: 'Placeholder Image 4',
        },
      ]}
    />
  </>
);

export default Home;
