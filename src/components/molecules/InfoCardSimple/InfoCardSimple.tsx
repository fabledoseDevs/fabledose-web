import Button from '@/atoms/Button';
import Headline from '@/atoms/Headline';
import { HEADLINE_TYPE } from '@/atoms/Headline/Headline.types';
import { FOREGROUND_COLOR as HEADLINE_COLOR } from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR as PARAGRAPH_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';
import PriceTag from '@/atoms/PriceTag';

import {
  CtaContainer,
  InfoCardSimpleBody,
  InfoContainer,
} from './InfoCardSimple.styled';
import type { InfoCardSimple as InfoCardSimpleType } from './InfoCardSimple.types';

export const InfoCardSimple: InfoCardSimpleType = ({
  title,
  description,
  optionalParagraphs,
  priceParams,
  buttonParams,
}) => (
  <InfoCardSimpleBody>
    <InfoContainer>
      <Headline weight={HEADLINE_TYPE.BIG} color={HEADLINE_COLOR.PURPLE}>
        {title}
      </Headline>
      <Paragraph color={PARAGRAPH_COLOR.PURPLE} alignment={TEXT_ALIGNMENT.LEFT}>
        {description}
      </Paragraph>
      {optionalParagraphs &&
        optionalParagraphs.map(paragraph => (
          <Paragraph
            key={paragraph.substring(0, 10) + '...'}
            color={PARAGRAPH_COLOR.PURPLE}
            alignment={TEXT_ALIGNMENT.LEFT}
          >
            {paragraph}
          </Paragraph>
        ))}
    </InfoContainer>
    <CtaContainer>
      <PriceTag {...priceParams} />
      <Button {...buttonParams} />
    </CtaContainer>
  </InfoCardSimpleBody>
);
