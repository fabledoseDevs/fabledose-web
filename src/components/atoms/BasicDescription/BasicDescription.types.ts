import type { ReactElement } from 'react';
/**
 * @file
 * This file defines the types and interfaces for the BasicDescription component.
 *
 * The BasicDescription has the following properties.
 *
 * Example usage:
 * ```tsx
 * <BasicDescription />
 * ```
 */

/**
 * Interface for BasicDescription component props.
 *
 * @property superText - Text displayed above the headline
 * @property headline - Main text displayed as a headline of the component
 * @property paragraph - Text content displayed below the headline
 */
export interface BasicDescriptionProps {
  superText: string;
  headline: string;
  paragraph: string;
}

/**
 * @group Components
 */
export type BasicDescription = (props: BasicDescriptionProps) => ReactElement;
