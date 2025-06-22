import {
  Description,
  Image,
  ImageContainer,
  InfoBoxBody,
  Title,
} from './InfoBox.styled';
import type { InfoBox as InfoBoxType } from './InfoBox.types';

export const InfoBox: InfoBoxType = ({ imageData, title, description }) => (
  <InfoBoxBody>
    <ImageContainer>
      <Image src={imageData.src} alt={imageData.alt} />
    </ImageContainer>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </InfoBoxBody>
);
