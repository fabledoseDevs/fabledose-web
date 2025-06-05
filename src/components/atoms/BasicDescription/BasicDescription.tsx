import Headline from '@/atoms/Headline';
import { HEADLINE_TYPE } from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';

import { BasicDescriptionBody } from './BasicDescription.styled';
import type { BasicDescription as BasicDescriptionType } from './BasicDescription.types';

export const BasicDescription: BasicDescriptionType = ({
  superText,
  headline,
  paragraph,
}) => (
  <BasicDescriptionBody>
    <Headline weight={HEADLINE_TYPE.SUPERTEXT}>{superText}</Headline>
    <Headline weight={HEADLINE_TYPE.BIG}>{headline}</Headline>
    <Paragraph>{paragraph}</Paragraph>
  </BasicDescriptionBody>
);
