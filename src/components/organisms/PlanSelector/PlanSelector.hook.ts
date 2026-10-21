import { useCallback, useMemo, useState } from 'react';

import { useDictionary } from '@/lang/DictionaryProvider';

import { createExtendedCards, createSimpleCards } from './PlanSelector.data';
import type { UsePlanSelector as UsePlanSelectorType } from './PlanSelector.types';

export const usePlanSelector: UsePlanSelectorType = options => {
  const isDisabled = options?.isDisabled ?? false;
  const { registerPage } = useDictionary();
  const onPlanSelected = options?.onPlanSelected;
  const [isDetailViewVisible, setIsDetailViewVisible] =
    useState<boolean>(false);

  const handleDetailViewToggle = () =>
    setIsDetailViewVisible(!isDetailViewVisible);

  const handlePlanSelect = useCallback(
    (plan: 'free' | 'family' | 'ultimate') => {
      if (!isDisabled && plan === 'free') onPlanSelected?.(plan);
    },
    [onPlanSelected, isDisabled],
  );

  const simpleCards = useMemo(() => {
    const cards = createSimpleCards(
      registerPage.planSelector,
      handlePlanSelect,
    );
    cards.forEach((card, index) => {
      card.buttonParams = {
        ...card.buttonParams,
        isDisabled: isDisabled || index !== 0,
      };
    });
    return cards;
  }, [handlePlanSelect, registerPage.planSelector, isDisabled]);

  const extendedCards = useMemo(
    () => createExtendedCards(registerPage.planSelector),
    [registerPage.planSelector],
  );

  return {
    isDetailViewVisible,
    simpleCards,
    extendedCards,
    handleDetailViewToggle,
  };
};
