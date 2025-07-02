import {
  BigHeadline,
  JumboHeadline,
  SmallHeadline,
  SupertextHeadline,
} from './Headline.styled';
import type {
  HeadlineType,
  HeadlineWeightSelectorType,
} from './Headline.types';
import { FOREGROUND_COLOR, HEADLINE_TYPE } from './Headline.types';

const headlineMap = {
  [HEADLINE_TYPE.JUMBO]: JumboHeadline,
  [HEADLINE_TYPE.BIG]: BigHeadline,
  [HEADLINE_TYPE.SMALL]: SmallHeadline,
  [HEADLINE_TYPE.SUPERTEXT]: SupertextHeadline,
};

const headlineWeightSelector: HeadlineWeightSelectorType = (
  weight,
  children,
  color,
) => {
  const Component = headlineMap[weight] || SupertextHeadline;
  if (weight === HEADLINE_TYPE.SUPERTEXT) {
    return (
      <Component dangerouslySetInnerHTML={{ __html: children as string }} />
    );
  }
  return (
    <Component
      color={color}
      dangerouslySetInnerHTML={{ __html: children as string }}
    />
  );
};

export const Headline: HeadlineType = ({
  weight,
  children,
  color = FOREGROUND_COLOR.PURPLE,
}) => headlineWeightSelector(weight, children, color);
