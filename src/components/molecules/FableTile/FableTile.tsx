import Image from 'next/image';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import { Paragraph } from '@/atoms/Paragraph/Paragraph';
import { FOREGROUND_COLOR } from '@/atoms/Paragraph/Paragraph.types';
import { useDictionary } from '@/lang/DictionaryProvider';

import { useFableTileInteraction } from './FableTile.hook';
import { ButtonsDrawer, FableTileBody, ProgressBarContainer, ProgressBarFill } from './FableTile.styled';
import type { FableTile as FableTileType } from './FableTile.types';

export const FableTile: FableTileType = ({
  imageUrl,
  fableTitle,
  fableDescription,
  fableUrl,
  registerTile,
  currentSlide,
  totalSlides,
}) => {
  const { isActive, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } =
    useFableTileInteraction();
  const { common } = useDictionary();

  const hasProgress = currentSlide !== undefined && totalSlides !== undefined && totalSlides > 0;
  const progressPercentage = hasProgress ? Math.round((currentSlide / totalSlides) * 100) : 0;

  return (
    <FableTileBody
      className={isActive ? 'active' : ''}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {hasProgress && (
        <ProgressBarContainer>
          <ProgressBarFill $progress={progressPercentage} />
        </ProgressBarContainer>
      )}
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
          text={registerTile ? common.register : common.readFable}
          payload={registerTile ? '/register' : fableUrl}
        />
      </ButtonsDrawer>
    </FableTileBody>
  );
};
