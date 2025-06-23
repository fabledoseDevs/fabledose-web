import type { ReactElement } from 'react';

/**
 * @file
 * This file defines the types and interfaces for the AccordionRib component.
 *
 * The AccordionRib is a component that displays content in an accordion-style layout.
 *
 * Example usage:
 * ```tsx
 * <AccordionRib
 *   mainText={'Click me and expand'}
 *   isOpen={false}
 *   isSelfControlled={false}
 * >
 *   Content visible when rib is expanded goes here...
 * </AccordionRib>
 * ```
 */

/**
 * Interface for AccordionRib component props.
 *
 * @property mainText - The main text to display as the accordion header
 * @property children - The content to be displayed when the accordion is expanded
 * @property isOpen - If true, accordion rib will be expanded with extra content.
 * @property isSelfControlled - If true, opening and closing of this rib can be done without a parent component (Accordion).
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
 * @property isOpen - The current open/closed state of the accordion
 * @property isSelfControlled - If true, the accordion manages its own state internally
 */
export interface UseAccordionRibProps {
  isOpen: boolean;
  isSelfControlled?: boolean;
  onToggle?: () => void;
}

/**
 * Interface for the return value of useAccordionRib hook.
 *
 * @property isOpen - The current open/closed state of the accordion
 * @property handleToggle - Function to toggle the accordion's open/closed state
 */
export interface UseAccordionRibReturn {
  isOpen: boolean;
  handleToggle: () => void;
}

/**
 * Hook type for managing accordion rib state and toggle behavior.
 *
 * @param props - The props object containing initial state and control mode
 * @returns Object containing current state and toggle handler
 */
export type UseAccordionRib = (
  props: UseAccordionRibProps,
) => UseAccordionRibReturn;

/**
 * @group Components
 */
export type AccordionRib = (props: AccordionRibProps) => ReactElement;
