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
import { useDictionary } from '@/lang/DictionaryProvider';
import PlanComparisonExtended from '@/organisms/PlanComparisonExtended';
import PlanComparisonSimple from '@/organisms/PlanComparisonSimple';
import { usePlanSelector } from '@/organisms/PlanSelector/PlanSelector.hook';

import {
  PlanSelectorBody,
  RedText,
  SelectorCard,
  SelectorContainer,
} from './PlanSelector.styled';
import type { PlanSelector as PlanSelectorType } from './PlanSelector.types';

export const PlanSelector: PlanSelectorType = props => {
  const { registerPage } = useDictionary();
  const {
    isDetailViewVisible,
    simpleCards,
    extendedCards,
    handleDetailViewToggle,
  } = usePlanSelector(props);
  const { planSelector } = registerPage;

  return (
    <PlanSelectorBody id="page-top">
      <SelectorCard>
        <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.PURPLE}>
          {planSelector.headline}
        </Headline>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          {planSelector.stepLabel}{' '}
          <RedText>{planSelector.stepHighlight}</RedText>
        </Paragraph>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          <span
            dangerouslySetInnerHTML={{
              __html: planSelector.registrationDescription,
            }}
          />
        </Paragraph>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          {registerPage.flow.paidUnavailable}
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
