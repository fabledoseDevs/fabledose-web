import type { ReactElement } from 'react';
/**
 * @module
 * This file defines the types and interfaces for the AccordionRib component.
 */

/**
 * Interface for AccordionRib component props.
 *
 * @property mainText - The main text to display as the accordion header.
 * @property children - The content to be displayed when the accordion is expanded.
 * @property isOpen - If true, accordion rib will be expanded with extra content.
 * @property isSelfControlled - If true, opening and closing of this rib can be done without a parent component (Accordion).
 * @property onToggle - Callback function triggered when the accordion rib is toggled (opened or closed).
 */
export interface AccordionRibProps {
  mainText: string;
  children: ReactElement | string;
  isOpen: boolean;
  isSelfControlled?: boolean;
  onToggle?: () => void;
}

/**
 * Interface for AccordionRib hook props.
 *
 * @property isOpen - The current open/closed state of the accordion.
 * @property isSelfControlled - If true, the accordion manages its own state internally.
 * @property onToggle - Callback function triggered when the accordion rib is toggled (opened or closed).
 */
export interface UseAccordionRibProps {
  isOpen: boolean;
  isSelfControlled?: boolean;
  onToggle?: () => void;
}

/**
 * Interface for the return value of useAccordionRib hook.
 *
 * @property isOpen - The current open/closed state of the accordion.
 * @property handleToggle - Function to toggle the accordion's open/closed state.
 */
export interface UseAccordionRibReturn {
  isOpen: boolean;
  handleToggle: () => void;
}

/**
 * Hook type for managing accordion rib state and toggle behavior.
 *
 * @param props - The props object containing initial state and control mode.
 * @returns Object containing current state and toggle handler.
 */
export type UseAccordionRib = (
  props: UseAccordionRibProps,
) => UseAccordionRibReturn;

/**
 * The AccordionRib is a component that displays content in an accordion-style layout.
 * It has the following properties.
 * @param props
 *  - `mainText`: The main text to display as the accordion header.
 *  - `isOpen`: If true, accordion rib will be expanded with extra content.
 *  - `isSelfControlled`: If true, opening and closing of this rib can be done without a parent component (Accordion).
 *  - `onToggle`: Callback function triggered when the accordion rib is toggled (opened or closed).
 *  - `children`: The content to be displayed when the accordion is expanded.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <AccordionRib
 *   mainText={'Click me and expand'}
 *   isOpen={false}
 *   isSelfControlled={false}
 *   onToggle={() => handleRibToggle(index)}
 * >
 *   Content visible when rib is expanded goes here...
 * </AccordionRib>
 * ```
 */
export type AccordionRib = (props: AccordionRibProps) => ReactElement;
