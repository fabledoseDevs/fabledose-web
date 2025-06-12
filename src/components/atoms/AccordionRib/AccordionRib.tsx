import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

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
}) => {
  const { isOpen, handleToggle } = useAccordionRib({
    isOpen: isOpenProp,
    isSelfControlled,
  });

  return (
    <AccordionRibBody>
      <StaticBar onClick={handleToggle}>
        <MainText>{mainText}</MainText>
        <ExpandButton>
          {isOpen ? <MinusCircleIcon /> : <PlusCircleIcon />}
        </ExpandButton>
      </StaticBar>
      <ExpandableContent isOpen={isOpen}>{children}</ExpandableContent>
    </AccordionRibBody>
  );
};
