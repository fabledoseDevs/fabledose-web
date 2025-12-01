import Button from '@/atoms/Button';
import InfoCardSimple from '@/molecules/InfoCardSimple';

import {
  CardsContainer,
  PlanComparisonSimpleBody,
} from './PlanComparisonSimple.styled';
import type { PlanComparisonSimple as PlanComparisonSimpleType } from './PlanComparisonSimple.types';

export const PlanComparisonSimple: PlanComparisonSimpleType = ({
  accountCards,
  button,
}) => (
  <PlanComparisonSimpleBody>
    <CardsContainer>
      {accountCards.map(card => (
        <InfoCardSimple key={'SIMPLE_CARD: ' + card.title} {...card} />
      ))}
    </CardsContainer>
    {button && <Button {...button} />}
  </PlanComparisonSimpleBody>
);
