import AccordionRib from '@/atoms/AccordionRib';

import { useAccordion } from './Accordion.hook';
import { AccordionBody } from './Accordion.styled';
import type { Accordion as AccordionType } from './Accordion.types';

export const Accordion: AccordionType = ({ ribsList }) => {
  const { openRibIndex, handleRibToggle } = useAccordion();

  return (
    <AccordionBody>
      {ribsList.map((rib, index) => (
        <AccordionRib
          key={rib.mainText}
          {...rib}
          isOpen={openRibIndex === index}
          onToggle={() => handleRibToggle(index)}
        />
      ))}
    </AccordionBody>
  );
};
