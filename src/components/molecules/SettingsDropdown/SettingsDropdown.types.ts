import type { ReactElement } from 'react';

import type { DropdownOption } from '@/atoms/Dropdown/Dropdown.types';
import type { InfoTooltipContent } from '@/atoms/InfoTooltip/InfoTooltip.types';

/**
 * @module
 * This file defines the types and interfaces for the SettingsDropdown component.
 */

/**
 * Interface for SettingsDropdown component props.
 *
 * @property label - Label displayed next to the dropdown setting.
 * @property options - Array of dropdown options (strings or objects with value/label).
 * @property info - Content for the information tooltip providing details about the setting.
 * @property defaultValue - Default selected value or placeholder text.
 * @property onChange - Optional callback function called when selection changes.
 */
export interface SettingsDropdownProps {
  label: string;
  options: (string | DropdownOption)[];
  info: InfoTooltipContent;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

/**
 * Interface defining the return values for useSettingsDropdown hook.
 *
 * @property handleDropdownChange - Function to handle dropdown value changes and trigger updates.
 */
export interface UseSettingsDropdownReturn {
  handleDropdownChange: (value: string) => void;
}

/**
 * Hook for managing SettingsDropdown logic.
 *
 * @param onChange - Optional callback function called when selection changes.
 *
 * @returns Object containing handlers for settings dropdown functionality.
 */
export type UseSettingsDropdown = (
  onChange?: (value: string) => void,
) => UseSettingsDropdownReturn;

/**
 * Component renders a settings dropdown field with a label and info tooltip.
 * It is designed to be used within the settings page for various configuration options.
 *
 * @param props - The component properties.
 *
 * @returns A ReactElement containing the settings dropdown UI.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SettingsDropdown
 *   label="Language"
 *   options={['English', 'Polish']}
 *   info={{ title: 'Language', description: 'Select your preferred language.' }}
 *   defaultValue="English"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export type SettingsDropdown = (props: SettingsDropdownProps) => ReactElement;
