import anime from 'animejs/lib/anime.es.js';
import { useEffect, useRef, useState } from 'react';

import type {
  UseAccordionRib as UseAccordionRibType,
  UseAccordionRibAnimationReturn,
} from './AccordionRib.types';

export const useAccordionRibAnimation = (
  isOpen: boolean,
): UseAccordionRibAnimationReturn => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const contentHeight = el.scrollHeight;

    if (isOpen) {
      el.style.overflow = 'hidden';
      anime({
        targets: el,
        height: [0, contentHeight],
        easing: 'easeOutCubic',
        duration: 400,
        complete: () => {
          el.style.height = 'auto';
          el.style.overflow = 'visible';
        },
      });
    } else {
      anime({
        targets: el,
        height: [contentHeight, 0],
        easing: 'easeInCubic',
        duration: 400,
      });
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
