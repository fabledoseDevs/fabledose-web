import type { ReactElement } from 'react';

/**
 * @file
 * This file defines the types and interfaces for the Headline component.
 *
 * The headline can have different styles and weights.
 *
 * Example usage:
 * ```tsx
 * <Headline weight={HEADLINE_TYPE.JUMBO}>
 *   Hello world
 * </Headline>
 * ```
 */

/**
 * Possible headline types for the Headline component.
 *
 * @remarks
 * - `JUMBO`: Represents the largest headline, typically used for jumbo banners.
 * - `BIG`: A large headline, used for main sections. You should use one per section.
 * - `SMALL`: A smaller headline, usually for subsections.
 * - `SUPERTEXT`: Represents a supertext, used for captions or smaller supplemental text.
 */
export enum HEADLINE_TYPE {
  JUMBO = 'jumbo',
  BIG = 'h1',
  SMALL = 'h2',
  SUPERTEXT = 'p',
}

/**
 * Interface defining the properties for the Headline component.
 *
 * @property children - The content of the headline (must be a plain string).
 * @property weight - The type of headline to render.
 *  - `HEADLINE_TYPE.JUMBO`
 *  - `HEADLINE_TYPE.BIG`
 *  - `HEADLINE_TYPE.SMALL`
 *  - `HEADLINE_TYPE.SUPERTEXT`
 */
export interface HeadlineProps {
  children: string;
  weight: HEADLINE_TYPE;
}

/**
 * This function selects and renders the headline type based on the weight.
 *
 * @param weight - The headline type from `HEADLINE_TYPE` used for rendering.
 * @param content - The text content to display in the headline.
 *
 * @returns A ReactElement rendering the specified headline.
 */
export type HeadlineWeightSelectorType = (
  weight: HEADLINE_TYPE,
  content: string,
) => ReactElement;

/**
 * @group Components
 */
export type HeadlineType = (props: HeadlineProps) => ReactElement;