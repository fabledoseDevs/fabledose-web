import type { ReactElement, RefObject } from 'react';

/**
 * @file
 * This file defines the types and interfaces for Dropdown component.
 *
 * The Dropdown component accepts an array of options and renders them as radio buttons
 * with collapsible functionality and customizable color schemes.
 *
 * Example usage:
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

export enum COLOR_SCHEME {
  PURPLE = 'purple',
  WHITE = 'white',
}

export interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Interface for Dropdown component props.
 *
 * @property options - Array of dropdown options (strings or objects with value/label)
 * @property title - Title/label for the dropdown
 * @property defaultValue - Default selected value or placeholder text
 * @property colorScheme - Color scheme for styling ('purple' or 'white')
 * @property onChange - Callback function called when selection changes
 * @property name - Name attribute for radio button group (optional, auto-generated if not provided)
 * @property isInitiallyOpen - Whether the dropdown should be open by default
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

export interface UseDropdownParams {
  options: (string | DropdownOption)[];
  title: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  isInitiallyOpen?: boolean;
}

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

export type UseDropdown = (
  params: UseDropdownParams,
) => UseDropdownReturnValues;

/**
 * @group Components
 */
export type DropdownTypes = (props: DropdownProps) => ReactElement;
