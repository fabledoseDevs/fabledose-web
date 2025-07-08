import { useEffect, useRef, useState } from 'react';

import type {
  UseAccordionRib as UseAccordionRibType,
  UseAccordionRibAnimationReturn,
} from './AccordionRib.types';

export const useAccordionRibAnimation = (
  isOpen: boolean,
): UseAccordionRibAnimationReturn => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = useRef<number>(0);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isInitialRender.current) {
      if (isOpen) {
        contentRef.current.style.height = 'auto';
        contentHeight.current = contentRef.current.scrollHeight + 30;
      }
      isInitialRender.current = false;
      return;
    }

    if (isOpen) {
      if (contentHeight.current === 0) {
        contentRef.current.style.height = '0';
      }

      contentRef.current.style.height = 'auto';
      contentHeight.current = contentRef.current.scrollHeight + 30;
      contentRef.current.style.height = `${contentHeight.current}px`;
    } else {
      contentRef.current.style.height = `${contentHeight.current}px`;
      void contentRef.current.offsetHeight;
      contentRef.current.style.height = '0';
    }
  }, [isOpen]);

  return {
    contentRef,
  };
};

export const useAccordionRib: UseAccordionRibType = ({
  isOpen: isOpenProp,
  isSelfControlled = false,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpenProp);

  const isOpen = isSelfControlled ? internalIsOpen : isOpenProp;

  const handleToggle = () => {
    if (isSelfControlled) {
      setInternalIsOpen(!internalIsOpen);
    } else if (onToggle) {
      onToggle();
    }
  };

  const { contentRef } = useAccordionRibAnimation(isOpen);

  return {
    isOpen,
    handleToggle,
    contentRef,
  };
};
