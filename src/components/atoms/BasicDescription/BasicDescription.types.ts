import type { ReactElement } from 'react';
/**
 * @module
 * This file defines the types and interfaces for the BasicDescription component.
 *
 */

/**
 * Interface for BasicDescription component props.
 *
 * @property superText - Text displayed above the headline.
 * @property headline - Main text displayed as a headline of the component.
 * @property paragraph - Text content displayed below the headline. Can be a single string or an array of strings.
 *                      If an array is provided, each element will be rendered as a separate paragraph.
 */
export interface BasicDescriptionProps {
  superText: string;
  headline: string;
  paragraph: string | string[];
}

/**
 * Component renders description with headline and text.
 * The BasicDescription has the following properties.
 * @param props - The component properties:
 *  - `superText`: Text displayed above the headline.
 *  - `headline`: Main text displayed as a headline of the component.
 *  - `paragraph`: Text content displayed below the headline. Can be a single string or an array of strings.
 *                If an array is provided, each element will be rendered as a separate paragraph.
 *
 * @group Component
 *
 * @example
 * ```tsx
 *   <BasicDescription
 *     superText="Above Headline"
 *     headline="Main Headline"
 *     paragraph="This is a single paragraph that appears below the headline."
 *   />
 * ```
 *
 * @example
 * ```tsx
 *   <BasicDescription
 *     superText="Above Headline"
 *     headline="Main Headline"
 *     paragraph={[
 *       "This is the first paragraph that appears below the headline.",
 *       "This is the second paragraph that appears below the headline."
 *     ]}
 *   />
 * ```
 */
export type BasicDescription = (props: BasicDescriptionProps) => ReactElement;
