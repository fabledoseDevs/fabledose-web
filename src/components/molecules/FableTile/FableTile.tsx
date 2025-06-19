import Image from 'next/image';

import Button from '@/atoms/Button';
import { ACTION_TYPE, BUTTON_VARIANT } from '@/atoms/Button/Button.types';

import { ButtonsDrawer, FableTileBody } from './FableTile.styled';
import type { FableTile as FableTileType } from './FableTile.types';

export const FableTile: FableTileType = ({ imageUrl, fableTitle, fableId }) => (
  <FableTileBody>
    <Image
      src={imageUrl}
      width={260}
      height={405}
      alt={fableTitle}
      loading="lazy"
    />
    <ButtonsDrawer>
      <Button
        actionType={ACTION_TYPE.NAVIGATION}
        variant={BUTTON_VARIANT.RED}
        fixedWidth={207}
        text={'Czytaj bajkę'}
        payload={`/${fableId}`}
      />
      <Button
        actionType={ACTION_TYPE.FUNCTION_TRIGGER}
        variant={BUTTON_VARIANT.TRANSPARENT}
        fixedWidth={207}
        text={'Więcej informacji'}
        //TODO: Replace payload when info modal is ready
        payload={() => console.info(fableId)}
      />
    </ButtonsDrawer>
  </FableTileBody>
);
