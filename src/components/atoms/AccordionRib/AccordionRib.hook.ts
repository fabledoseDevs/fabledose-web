import { useState } from 'react';

import type { UseAccordionRib as UseAccordionRibType } from './AccordionRib.types';

export const useAccordionRib: UseAccordionRibType = ({
  isOpen: isOpenProp,
  isSelfControlled = false,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpenProp);

  const isOpen = isSelfControlled ? internalIsOpen : isOpenProp;

  const handleToggle = () => {
    if (isSelfControlled) {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return {
    isOpen,
    handleToggle,
  };
};
