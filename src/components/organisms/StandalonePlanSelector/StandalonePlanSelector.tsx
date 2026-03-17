import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Paragraph from '@/atoms/Paragraph';
import { TEXT_ALIGNMENT } from '@/atoms/Paragraph/Paragraph.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import PlanComparisonExtended from '@/organisms/PlanComparisonExtended';
import PlanComparisonSimple from '@/organisms/PlanComparisonSimple';

import { useStandalonePlanSelector } from './StandalonePlanSelector.hook';
import {
  PlanSelectorBody,
  SelectorCard,
  SelectorContainer,
} from './StandalonePlanSelector.styled';
import type { StandalonePlanSelector as StandalonePlanSelectorType } from './StandalonePlanSelector.types';

export const StandalonePlanSelector: StandalonePlanSelectorType = ({
  onPlanSelected,
}) => {
  const { registerPage } = useDictionary();
  const {
    isDetailViewVisible,
    simpleCards,
    extendedCards,
    handleDetailViewToggle,
  } = useStandalonePlanSelector({ onPlanSelected });
  const { planSelector } = registerPage;

  return (
    <PlanSelectorBody id="page-top">
      <SelectorCard>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          {planSelector.standaloneDescription}
        </Paragraph>
        <SelectorContainer>
          <PlanComparisonSimple accountCards={simpleCards} />
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.WHITE}
            text={
              isDetailViewVisible
                ? planSelector.hideDetails
                : planSelector.showDetails
            }
            payload={() => handleDetailViewToggle()}
            width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 80 }}
          />
        </SelectorContainer>
        {isDetailViewVisible && (
          <SelectorContainer>
            <PlanComparisonExtended accountCards={extendedCards} />
            <Button
              actionType={ACTION_TYPE.NAVIGATION}
              variant={BUTTON_VARIANT.RED}
              text={planSelector.backToTop}
              payload="#page-top"
              width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 80 }}
            />
          </SelectorContainer>
        )}
      </SelectorCard>
    </PlanSelectorBody>
  );
};
