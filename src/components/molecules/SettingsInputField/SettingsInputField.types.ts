import type { ChangeEvent, ReactElement } from 'react';

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
 */
export interface SettingsInputFieldProps {
  label: string;
  info: InfoTooltipContent;
  variant?: FIELD_VARIANT;
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
 * @returns An object containing the state and handlers for the input field.
 */
export type UseSettingsInputField = (
  variant: FIELD_VARIANT,
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
