import { useCallback, useMemo, useState } from 'react';

import { useSettings } from '@/contexts/SettingsContext';
import { useDictionary } from '@/lang/DictionaryProvider';
import {
  createExtendedCards,
  createSimpleCards,
} from '@/organisms/PlanSelector/PlanSelector.data';

import type { UseStandalonePlanSelector as UseStandalonePlanSelectorType } from './StandalonePlanSelector.types';

export const useStandalonePlanSelector: UseStandalonePlanSelectorType =
  options => {
    const { updateSettings } = useSettings();
    const { registerPage } = useDictionary();
    const onPlanSelected = options?.onPlanSelected;
    const [isDetailViewVisible, setIsDetailViewVisible] =
      useState<boolean>(false);

    const handleDetailViewToggle = () =>
      setIsDetailViewVisible(!isDetailViewVisible);

    const handlePlanSelect = useCallback(
      (plan: 'free' | 'family' | 'ultimate') => {
        updateSettings({ plan });
        onPlanSelected?.(plan);
      },
      [onPlanSelected, updateSettings],
    );

    const simpleCards = useMemo(
      () => createSimpleCards(registerPage.planSelector, handlePlanSelect),
      [handlePlanSelect, registerPage.planSelector],
    );

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
