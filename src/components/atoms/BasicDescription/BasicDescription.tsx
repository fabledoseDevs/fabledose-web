import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';

import { BasicDescriptionBody } from './BasicDescription.styled';
import type { BasicDescription as BasicDescriptionType } from './BasicDescription.types';

export const BasicDescription: BasicDescriptionType = ({
  superText,
  headline,
  paragraph,
}) => (
  <BasicDescriptionBody>
    <Headline weight={HEADLINE_TYPE.SUPERTEXT} color={FOREGROUND_COLOR.PURPLE}>
      {superText}
    </Headline>
    <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.PURPLE}>
      {headline}
    </Headline>
    <Paragraph>{paragraph}</Paragraph>
  </BasicDescriptionBody>
);
