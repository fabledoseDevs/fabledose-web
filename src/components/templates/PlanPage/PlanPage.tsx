'use client';

import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
} from '@/atoms/Container/Container.types';
import StandalonePlanSelector from '@/organisms/StandalonePlanSelector';

import { BackgroundImage, Gradient, PlanPageBody } from './PlanPage.styled';
import type { PlanPage as PlanPageType } from './PlanPage.types';

export const PlanPage: PlanPageType = ({ onPlanSelected }) => (
  <PlanPageBody>
    <BackgroundImage
      src="/jumbo-static.jpg"
      alt="Jumbotron background"
      fill
      style={{ objectFit: 'cover', objectPosition: 'center' }}
      priority
    />
    <Gradient />
    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
      alignItems={FLEX_ALIGNMENT.CENTER}
      maxWidth={1440}
    >
      <StandalonePlanSelector onPlanSelected={onPlanSelected} />
    </Container>
  </PlanPageBody>
);
