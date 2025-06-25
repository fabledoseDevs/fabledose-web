import type { ReactElement, RefObject } from 'react';

/**
 * @module
 * This file defines the types and interfaces for a Dropdown component.
 */

/**
 * Available color schemes for the Dropdown component.
 *
 * @remarks
 * - `PURPLE`: Purple-themed dropdown style.
 * - `WHITE`: White-themed dropdown style.
 */
export enum COLOR_SCHEME {
  PURPLE = 'purple',
  WHITE = 'white',
}

/**
 * Interface defining the structure of a dropdown option.
 *
 * @property value - Unique identifier or value for the option.
 * @property label - Display text shown to the user for the option.
 */
export interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Interface for Dropdown component props.
 *
 * @property options - Array of dropdown options (strings or objects with value/label).
 * @property title - Title/label for the dropdown.
 * @property defaultValue - Default selected value or placeholder text.
 * @property colorScheme - Color scheme for styling.
 * @property onChange - Callback function called when selection changes.
 * @property name - Name attribute for a radio button group (optional, auto-generated if not provided).
 * @property isInitiallyOpen - Whether the dropdown should be open by default.
 */
export interface DropdownProps {
  options: (string | DropdownOption)[];
  title: string;
  defaultValue?: string;
  colorScheme: COLOR_SCHEME;
  onChange?: (value: string) => void;
  name?: string;
  isInitiallyOpen?: boolean;
}

/**
 * Interface defining the parameters for useDropdown hook.
 *
 * @property options - Array of dropdown options (strings or objects with value/label).
 * @property title - Title/label for the dropdown.
 * @property defaultValue - Default selected value or placeholder text.
 * @property onChange - Callback function called when selection changes.
 * @property name - Name attribute for a radio button group (optional).
 * @property isInitiallyOpen - Whether the dropdown should be open by default.
 */
export interface UseDropdownParams {
  options: (string | DropdownOption)[];
  title: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  isInitiallyOpen?: boolean;
}

/**
 * Interface for the return value of useDropdown hook.
 *
 * @property selectedValue - Currently selected option value.
 * @property handleChange - Function to handle selection changes.
 * @property normalizedOptions - Array of normalized options in DropdownOption format.
 * @property isOpen - Current open/closed state of dropdown.
 * @property toggleOpen - Function to toggle dropdown open/closed state.
 * @property displayValue - Text to display as current selection.
 * @property dropdownRef - React ref for a dropdown container element.
 * @property radioGroupName - Unique name for a radio button group.
 */
export interface UseDropdownReturnValues {
  selectedValue: string;
  handleChange: (value: string) => void;
  normalizedOptions: DropdownOption[];
  isOpen: boolean;
  toggleOpen: () => void;
  displayValue: string;
  dropdownRef: RefObject<HTMLDivElement | null>;
  radioGroupName: string;
}

/**
 * Hook type for managing dropdown state and behavior.
 *
 * @param params - Configuration object for dropdown behavior.
 *  - `options`: Array of dropdown options (strings or objects with value/label).
 *  - `title`: Title/label for the dropdown.
 *  - `defaultValue`: Default selected value or placeholder text.
 *  - `onChange`: Callback function called when selection changes.
 *  - `name`: Name attribute for a radio button group (optional).
 *  - `isInitiallyOpen`: Whether the dropdown should be open by default.
 *
 * @returns Object containing state and handlers for dropdown functionality.
 */
export type UseDropdown = (
  params: UseDropdownParams,
) => UseDropdownReturnValues;

/**
 * Component renders Dropdown element.
 * The Dropdown accepts an array of options and renders them as radio buttons with collapsable functionality and customizable color schemes.
 *
 * @param props - The component properties:
 *  - `options`: Array of dropdown options (strings or objects with value/label).
 *  - `title`: Title/label for the dropdown.
 *  - `defaultValue`: Default selected value or placeholder text.
 *  - `colorScheme`: Color scheme for styling. Needs to be taken from {@link COLOR_SCHEME}.
 *  - `onChange`: Callback function called when selection changes.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Dropdown
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   title="Select an option"
 *   defaultValue="Option 1"
 *   colorScheme="purple"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export type DropdownTypes = (props: DropdownProps) => ReactElement;
