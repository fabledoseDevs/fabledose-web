import { useState } from 'react';

import type {
  HandleRibToggle as HandleRibToggleType,
  UseAccordion as UseAccordionType,
} from './Accordion.types';

export const useAccordion: UseAccordionType = () => {
  const [openRibIndex, setOpenRibIndex] = useState<number | null>(null);

  const handleRibToggle: HandleRibToggleType = index => {
    setOpenRibIndex(currentOpenIndex => {
      if (currentOpenIndex === index) {
        return null;
      }
      return index;
    });
  };

  return { openRibIndex, handleRibToggle };
};
