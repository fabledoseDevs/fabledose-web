import type { ChangeEvent, ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for SettingsInputField component.
 */

/**
 * Interface for the info tooltip content.
 *
 * @property title - The title of the tooltip.
 * @property description - The description or body text of the tooltip.
 */
export interface SettingsInputFieldInfo {
  title: string;
  description: string;
}

/**
 * Interface for SettingsInputField component props.
 *
 * @property label - The label of the input field.
 * @property info - The content for the info tooltip.
 */
export interface SettingsInputFieldProps {
  label: string;
  info: SettingsInputFieldInfo;
}

/**
 * Interface for the values returned by the useSettingsInputField hook.
 *
 * @property isEditMode - Boolean flag indicating if the field is in edit mode.
 * @property value - The current string value of the input field.
 * @property toggleEditMode - Function to switch between edit and display modes.
 * @property handleInputChange - Event handler for input changes.
 * @property isTooltipVisible - Boolean flag for tooltip visibility.
 * @property showTooltip - Function to show the tooltip.
 * @property hideTooltip - Function to hide the tooltip.
 * @property toggleTooltip - Function to toggle the tooltip visibility.
 */
export interface UseSettingsInputFieldReturnValues {
  isEditMode: boolean;
  value: string;
  toggleEditMode: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isTooltipVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
  toggleTooltip: () => void;
}

/**
 * Hook to manage the state and logic for the SettingsInputField component.
 *
 * @returns An object containing the state and handlers for the input field.
 */
export type UseSettingsInputField = () => UseSettingsInputFieldReturnValues;

/**
 * Component renders a settings input field with display and edit modes.
 *
 * @param props - The component properties:
 *  - `label`: The label of the input field.
 *  - `info`: The content for the info tooltip.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SettingsInputField
 *   label="Nazwa wyświetlana:"
 *   info={{
 *     title: 'Display Name',
 *     description: 'This name will be visible to other users.'
 *   }}
 * />
 * ```
 */
export type SettingsInputField = (
  props: SettingsInputFieldProps,
) => ReactElement;
