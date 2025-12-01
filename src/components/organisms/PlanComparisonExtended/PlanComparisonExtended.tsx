import Button from '@/atoms/Button';
import InfoCardExtended from '@/molecules/InfoCardExtended';

import {
  CardsContainer,
  PlanComparisonSimpleBody,
} from './PlanComparisonExtended.styled';
import type { PlanComparisonSimple as PlanComparisonSimpleType } from './PlanComparisonExtended.types';

export const PlanComparisonExtended: PlanComparisonSimpleType = ({
  accountCards,
  button,
}) => (
  <PlanComparisonSimpleBody>
    <CardsContainer>
      {accountCards.map(card => (
        <InfoCardExtended key={'EXTENDED_CARD: ' + card.title} {...card} />
      ))}
    </CardsContainer>
    {button && <Button {...button} />}
  </PlanComparisonSimpleBody>
);
