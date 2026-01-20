import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the InfoTooltip component.
 */

/**
 * Interface for the content of the information tooltip.
 *
 * @property title - The title displayed in the tooltip.
 * @property description - The detailed description displayed in the tooltip.
 */
export interface InfoTooltipContent {
  title: string;
  description: string;
}

/**
 * Interface for InfoTooltip component props.
 *
 * @property content - The content (title and description) to be displayed in the tooltip.
 */
export interface InfoTooltipProps {
  content: InfoTooltipContent;
}

/**
 * Interface for the values returned by the useInfoTooltip hook.
 *
 * @property isTooltipVisible - Boolean flag indicating if the tooltip is currently visible.
 * @property showTooltip - Function to make the tooltip visible.
 * @property hideTooltip - Function to hide the tooltip.
 * @property toggleTooltip - Function to toggle the tooltip visibility.
 */
export interface UseInfoTooltipReturnValues {
  isTooltipVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
  toggleTooltip: () => void;
}

/**
 * Hook to manage the visibility state of the information tooltip.
 *
 * @returns An object containing the visibility state and handlers.
 */
export type UseInfoTooltip = () => UseInfoTooltipReturnValues;

/**
 * Component that renders an information icon with a tooltip on hover/click.
 *
 * @param props - The component properties.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <InfoTooltip
 *  content={{title: 'Display Name', description: 'This name will be visible to other users.'}}
 * />
 */
export type InfoTooltip = (props: InfoTooltipProps) => ReactElement;
