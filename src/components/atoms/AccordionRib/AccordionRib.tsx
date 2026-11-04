import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useId } from 'react';

import { useAccordionRib } from './AccordionRib.hook';
import {
  AccordionRibBody,
  ExpandableContent,
  ExpandButton,
  MainText,
  StaticBar,
} from './AccordionRib.styled';
import type { AccordionRib as AccordionRibType } from './AccordionRib.types';

export const AccordionRib: AccordionRibType = ({
  mainText,
  children,
  isOpen: isOpenProp,
  isSelfControlled = false,
  onToggle,
}) => {
  const contentId = useId();
  const { isOpen, handleToggle } = useAccordionRib({
    isOpen: isOpenProp,
    isSelfControlled,
    onToggle,
  });

  return (
    <AccordionRibBody>
      <StaticBar
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <MainText>{mainText}</MainText>
        <ExpandButton>
          {isOpen ? <MinusCircleIcon /> : <PlusCircleIcon />}
        </ExpandButton>
      </StaticBar>
      <ExpandableContent
        id={contentId}
        isOpen={isOpen}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div>
          <div>{children}</div>
        </div>
      </ExpandableContent>
    </AccordionRibBody>
  );
};
