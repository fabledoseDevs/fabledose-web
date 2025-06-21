import Image from 'next/image';

import BasicDescription from '@/atoms/BasicDescription';
import Button from '@/atoms/Button';

import {
  DescriptionContainer,
  ImageContainer,
  StandaloneStoryCardBody,
} from './StandaloneStoryCard.styled';
import type { StandaloneStoryCard as StandaloneStoryCardType } from './StandaloneStoryCard.types';

export const StandaloneStoryCard: StandaloneStoryCardType = ({
  descriptionData,
  buttonData,
  imageData,
}) => (
  <StandaloneStoryCardBody>
    <DescriptionContainer>
      <BasicDescription {...descriptionData} />
      <Button {...buttonData} />
    </DescriptionContainer>
    <ImageContainer>
      <Image width={800} height={600} loading="lazy" {...imageData} />
    </ImageContainer>
  </StandaloneStoryCardBody>
);
