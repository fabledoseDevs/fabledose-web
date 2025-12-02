import type { ReactElement } from 'react';
import type React from 'react';

/**
 * @module
 * This file defines the types and interfaces for the InputField component.
 */

/**
 * Possible input types for the input field.
 *
 * @remarks
 * - `TEXT`: Standard text input.
 * - `EMAIL`: Email input with email validation.
 * - `PASSWORD`: Password input with visibility toggle.
 * - `NUMBER`: Numeric input.
 * - `TEL`: Telephone number input.
 * - `URL`: URL input.
 * - `SEARCH`: Search input with search icon.
 * - `DATE`: Date picker input.
 * - `MONTH`: Month picker input.
 */
export enum INPUT_TYPE {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url',
  SEARCH = 'search',
  DATE = 'date',
  MONTH = 'month',
}

/**
 * Possible icon types for the input field.
 *
 * @remarks
 * - `EYE`: Used for password visibility toggle (show password).
 * - `EYE_SLASH`: Used for password visibility toggle (hide password).
 * - `MAGNIFYING_GLASS`: Used for search input fields.
 */
export enum INPUT_ICON {
  EYE = 'eye',
  EYE_SLASH = 'eyeSlash',
  MAGNIFYING_GLASS = 'magnifyingGlass',
}

/**
 * Interface for input field component props.
 *
 * @property type - The type of input field from INPUT_TYPE enum.
 * @property fixedWidth - Optional width of the input field in pixels.
 * @property placeholder - Optional placeholder text for the input field.
 * @property errorMessage - Optional error message to display below the input field.
 * @property value - Optional controlled value of the input.
 * @property onChange - Optional change handler for controlled inputs.
 * @property name - Optional name attribute for form integrations.
 */
export interface InputFieldProps {
  type: INPUT_TYPE;
  fixedWidth?: number;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

/**
 * Type definition for the icon renderer function.
 *
 * @returns A ReactElement representing the icon to be displayed, or null if no icon should be shown.
 */
export type RenderIconFunction = () => ReactElement | null;

/**
 * Icon type for input field icons.
 *
 * @property icon - The icon type to display, or null if no icon should be shown.
 * @property onClick - Optional click handler for the icon.
 */
export type InputIcon = {
  icon: INPUT_ICON | null;
  onClick?: () => void;
};

/**
 * Function to determine the actual input type based on the provided type and password visibility.
 *
 * @param type - The input type from INPUT_TYPE enum.
 * @returns The actual input type to use.
 */
export type GetInputTypeFunction = (type: INPUT_TYPE) => INPUT_TYPE;

/**
 * Function to get the appropriate icon information based on input type.
 *
 * @param type - The input type from INPUT_TYPE enum.
 * @returns Icon information including icon type and click handler.
 */
export type GetIconFunction = (type: INPUT_TYPE) => InputIcon;

/**
 * Hook for handling input field functionality.
 *
 * @returns Object containing state, handlers, and utility functions for the input field.
 * @property defaultState - Whether the input field is in its default state.
 * @property showPassword - Whether the password is currently visible (for password fields).
 * @property togglePasswordVisibility - Function to toggle password visibility.
 * @property getInputType - Function to get the actual input type based on the provided type and password visibility.
 * @property getIcon - Function to get the appropriate icon information based on input type.
 */
export type UseInputText = () => {
  defaultState: boolean;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  getInputType: GetInputTypeFunction;
  getIcon: GetIconFunction;
};

/**
 * Component renders input element.
 * The input field can have different types, icons, and validation states.
 *
 * @param props - The component properties:
 *  - `type`: The type of input field from {@link INPUT_TYPE} enum.
 *  - `placeholder`: Optional placeholder text for the input field.
 *  - `fixedWidth`: Number of pixels used to set width of input. If not provided, width defaults to 100%.
 *  - `errorMessage`: Message that should be returned from form validation.
 *  - `value`: Optional controlled value of the input.
 *  - `onChange`: Optional change handler for controlled inputs.
 *  - `name`: Optional name attribute for form integrations.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <InputField
 *    type={INPUT_TYPE.TEXT}
 *    placeholder="Enter text..."
 *    fixedWidth={360}
 *    errorMessage="This field is required"
 * />
 * ```
 */
export type InputField = (props: InputFieldProps) => ReactElement;
