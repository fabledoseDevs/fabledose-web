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
import { HEADLINE_TYPE } from './Headline.types';

const headlineMap = {
  [HEADLINE_TYPE.JUMBO]: JumboHeadline,
  [HEADLINE_TYPE.BIG]: BigHeadline,
  [HEADLINE_TYPE.SMALL]: SmallHeadline,
  [HEADLINE_TYPE.SUPERTEXT]: SupertextHeadline,
};

const headlineWeightSelector: HeadlineWeightSelectorType = (
  weight,
  children,
) => {
  const Component = headlineMap[weight] || SupertextHeadline;
  return <Component>{children}</Component>;
};

export const Headline: HeadlineType = ({ weight, children }) =>
  headlineWeightSelector(weight, children);
