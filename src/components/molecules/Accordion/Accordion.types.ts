import type { ReactElement } from 'react';

import type { AccordionRibProps } from '@/atoms/AccordionRib';

/**
 * @module
 This file defines the types and interfaces for the Accordion component.
 */

/**
 * Interface for Accordion component props.
 *
 * @property ribsList - Array of AccordionRib props to render.
 */
export interface AccordionProps {
  ribsList: AccordionRibProps[];
}

/**
 * Interface for the return value of useAccordion hook.
 *
 * @property openRibIndex - Index of the currently open rib, or null if none are open.
 * @property handleRibToggle - Function to toggle a rib's open/closed state.
 */
export interface UseAccordionReturnValues {
  openRibIndex: number | null;
  handleRibToggle: (index: number) => void;
}

/**
 * Toggle a rib's open/closed state.
 * If the rib is already open, it will be closed.
 * If a different rib is already open, it will be closed and the new one opened.
 *
 * @param index - The index of the rib to toggle.
 */
export type HandleRibToggle = (index: number) => void;

/**
 * Hook for managing the state of an Accordion component.
 * Tracks which rib is currently open and provides a function to toggle ribs.
 * When a rib is toggled, any currently open rib will be closed.
 */
export type UseAccordion = () => UseAccordionReturnValues;

/**
 * Accordion component that manages a list of AccordionRib components. Controls which rib is open, ensuring only one can be open at a time.
 *
 * @param props - The component properties:
 *   - `ribsList`: Array of AccordionRib component to render. Needs to follow a pattern of {@link AccordionRibProps}.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Accordion ribsList={[
 *   { mainText: 'Section 1', children: 'Content 1', isOpen: false },
 *   { mainText: 'Section 2', children: 'Content 2', isOpen: false }
 * ]} />
 * ```
 */
export type Accordion = (props: AccordionProps) => ReactElement;
