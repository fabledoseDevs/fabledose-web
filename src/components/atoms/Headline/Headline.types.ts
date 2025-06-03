/**
 * This component renders a headline.
 * The headline can have different styling and tag.
 *
 * Example usage:
 * ```tsx
 * <Headline weight={HEADLINE_TYPE.JUMBO}>
 *   Hello world
 * </Headline>
 * ```
 */

import type { ReactElement } from 'react';

export enum HEADLINE_TYPE {
  JUMBO = 'jumbo', // The largest headline, used for jumbo banner on LP.
  BIG = 'h1', // A large headline, used for main sections. Use one per section tag!
  SMALL = 'h2', // A smaller headline, used for subsections.
  SUPERTEXT = 'p', // A supertext headline, used for overhead captions.
}

export interface HeadlineProps {
  /**
   * Children should be a string that will be rendered as the headline content.
   */
  children: string;
  /**
   * The type of headline to render.
   * Can be one of the following:
   * - HEADLINE_TYPE.JUMBO
   * - HEADLINE_TYPE.BIG
   * - HEADLINE_TYPE.SMALL
   * - HEADLINE_TYPE.SUPERTEXT
   */
  weight: HEADLINE_TYPE;
}

/**
 * This function selects the headline type and renders the content.
 */
export type HeadlineWeightSelectorType = (
  weight: HEADLINE_TYPE,
  content: string,
) => ReactElement;

/**
 * @group Components
 */
export type HeadlineType = (props: HeadlineProps) => ReactElement;
