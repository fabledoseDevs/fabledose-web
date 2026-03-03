import type { ChangeEvent, ReactElement } from 'react';
import type React from 'react';

import type { InfoTooltipContent } from '@/atoms/InfoTooltip';

/**
 * @module
 * This file defines the types and interfaces for the SettingsInputField component.
 */

export enum FIELD_VARIANT {
  TEXT = 'TEXT',
  PASSWORD = 'PASSWORD',
  CREDIT_CARD = 'CREDIT_CARD',
  EMAIL = 'EMAIL',
}

/**
 * Interface for SettingsInputField component props.
 *
 * @property label - The label of the input field.
 * @property info - The content for the info tooltip.
 * @property variant - The variant of the input field.
 * @property value - The current value of the input, passed from a parent component.
 * @property onChange - Handler for when the input value changes.
 * @property onBlur - Handler for when the input loses focus.
 */
export interface SettingsInputFieldProps {
  label: string;
  info: InfoTooltipContent;
  variant?: FIELD_VARIANT;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

/**
 * Interface for the values returned by the useSettingsInputField hook.
 *
 * @property isEditMode - Boolean flag indicating if the field is in edit mode.
 * @property value - The current string value of the input field.
 * @property toggleEditMode - Function to switch between edit and display modes.
 * @property handleInputChange - Event handler for input changes.
 */
export interface UseSettingsInputFieldReturnValues {
  isEditMode: boolean;
  value: string;
  toggleEditMode: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isPopupOpen: boolean;
  closePopup: () => void;
  handleCardSave: (cardNumber: string) => void;
}

/**
 * Hook to manage the state and logic for the SettingsInputField component.
 *
 * @param variant - The variant of the input field.
 * @param valueProp - The initial value passed from the parent.
 * @param onChangeProp - The change handler passed from the parent.
 * @returns An object containing the state and handlers for the input field.
 */
export type UseSettingsInputField = (
  variant: FIELD_VARIANT,
  valueProp?: string,
  onChangeProp?: (e: ChangeEvent<HTMLInputElement>) => void,
) => UseSettingsInputFieldReturnValues;

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
