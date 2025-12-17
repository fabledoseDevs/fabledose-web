import Image from 'next/image';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import { Paragraph } from '@/atoms/Paragraph/Paragraph';
import { FOREGROUND_COLOR } from '@/atoms/Paragraph/Paragraph.types';

import { useFableTileInteraction } from './FableTile.hook';
import { ButtonsDrawer, FableTileBody } from './FableTile.styled';
import type { FableTile as FableTileType } from './FableTile.types';

export const FableTile: FableTileType = ({
  imageUrl,
  fableTitle,
  fableId,
  fableDescription,
}) => {
  const { isActive, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } =
    useFableTileInteraction();

  return (
    <FableTileBody
      className={isActive ? 'active' : ''}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Image
        src={imageUrl}
        alt={fableTitle}
        loading="lazy"
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 310px) 100vw, 310px"
      />
      <ButtonsDrawer data-overlay>
        <Paragraph color={FOREGROUND_COLOR.WHITE}>{fableDescription}</Paragraph>
        <Button
          actionType={ACTION_TYPE.NAVIGATION}
          variant={BUTTON_VARIANT.RED}
          width={{
            widthType: WIDTH_TYPE.PX,
            widthValue: 207,
          }}
          text={'Czytaj bajkę'}
          payload={`/${fableId}`}
        />
      </ButtonsDrawer>
    </FableTileBody>
  );
};
