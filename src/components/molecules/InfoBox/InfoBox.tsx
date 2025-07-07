import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';

import { Image, ImageContainer, InfoBoxBody, Title } from './InfoBox.styled';
import type { InfoBox as InfoBoxType } from './InfoBox.types';

export const InfoBox: InfoBoxType = ({ imageData, title, description }) => (
  <InfoBoxBody>
    <ImageContainer>
      <Image src={imageData.src} alt={imageData.alt} />
    </ImageContainer>
    <Title>{title}</Title>
    <Paragraph color={FOREGROUND_COLOR.WHITE} alignment={TEXT_ALIGNMENT.CENTER}>
      {description}
    </Paragraph>
  </InfoBoxBody>
);
