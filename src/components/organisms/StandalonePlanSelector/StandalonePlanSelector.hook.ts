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
    const [pending, setPending] = useState(false);
    const [planError, setPlanError] = useState(false);
    const [planSaved, setPlanSaved] = useState(false);
    const [isDetailViewVisible, setIsDetailViewVisible] =
      useState<boolean>(false);

    const handleDetailViewToggle = () =>
      setIsDetailViewVisible(!isDetailViewVisible);

    const handlePlanSelect = useCallback(
      async (plan: 'free' | 'family' | 'ultimate') => {
        if (pending) return;
        setPending(true);
        setPlanError(false);
        setPlanSaved(false);
        const saved = await updateSettings({ plan });
        setPending(false);
        if (saved) {
          setPlanSaved(true);
          onPlanSelected?.(plan);
        } else setPlanError(true);
      },
      [onPlanSelected, updateSettings, pending],
    );

    const simpleCards = useMemo(() => {
      const cards = createSimpleCards(
        registerPage.planSelector,
        handlePlanSelect,
      );
      cards.forEach(card => {
        card.buttonParams = { ...card.buttonParams, isDisabled: pending };
      });
      return cards;
    }, [handlePlanSelect, registerPage.planSelector, pending]);

    const extendedCards = useMemo(
      () => createExtendedCards(registerPage.planSelector),
      [registerPage.planSelector],
    );

    return {
      planError,
      planSaved,
      isDetailViewVisible,
      simpleCards,
      extendedCards,
      handleDetailViewToggle,
    };
  };
