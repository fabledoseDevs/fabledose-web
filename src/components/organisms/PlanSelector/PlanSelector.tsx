import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import { TEXT_ALIGNMENT } from '@/atoms/Paragraph/Paragraph.types';
import { RedText } from '@/molecules/RegisterForm/RegisterForm.styled';
import PlanComparisonExtended from '@/organisms/PlanComparisonExtended';
import PlanComparisonSimple from '@/organisms/PlanComparisonSimple';
import { usePlanSelector } from '@/organisms/PlanSelector/PlanSelector.hook';

import { CARDS_EXTENDED, CARDS_SIMPLE } from './PlanSelector.data';
import {
  PlanSelectorBody,
  SelectorCard,
  SelectorContainer,
} from './PlanSelector.styled';
import type { PlanSelector as PlanSelectorType } from './PlanSelector.types';

export const PlanSelector: PlanSelectorType = () => {
  const { isDetailViewVisible, handleDetailViewToggle } = usePlanSelector();

  return (
    <PlanSelectorBody id="page-top">
      <SelectorCard>
        <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.PURPLE}>
          Skonfiguruj konto
        </Headline>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          Krok <RedText>2 z 2</RedText>
        </Paragraph>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          Konto zostało założone. Domyślnie zostało ustawione na Starter.
          <br />
          Jeżeli interesuje cię szerszy zakres usługi, tutaj wybierzesz konto
          dopasowane do Twoich oczekiwań.
        </Paragraph>
        <SelectorContainer>
          <PlanComparisonSimple accountCards={CARDS_SIMPLE} />
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.WHITE}
            text={
              isDetailViewVisible
                ? 'Ukryj pełne porównanie'
                : 'Zobacz pełne porównanie'
            }
            payload={() => handleDetailViewToggle()}
            width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 80 }}
          />
        </SelectorContainer>
        {isDetailViewVisible && (
          <SelectorContainer>
            <PlanComparisonExtended accountCards={CARDS_EXTENDED} />
            <Button
              actionType={ACTION_TYPE.NAVIGATION}
              variant={BUTTON_VARIANT.RED}
              text={'Powrót do góry'}
              payload="#page-top"
              width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 80 }}
            />
          </SelectorContainer>
        )}
      </SelectorCard>
    </PlanSelectorBody>
  );
};
