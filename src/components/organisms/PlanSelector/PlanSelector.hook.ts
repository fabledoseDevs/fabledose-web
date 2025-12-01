import { useState } from 'react';

import type { UsePlanSelector as UsePlanSelectorType } from './PlanSelector.types';

export const usePlanSelector: UsePlanSelectorType = () => {
  const [isDetailViewVisible, setIsDetailViewVisible] =
    useState<boolean>(false);

  const handleDetailViewToggle = () =>
    setIsDetailViewVisible(!isDetailViewVisible);

  return { isDetailViewVisible, handleDetailViewToggle };
};
