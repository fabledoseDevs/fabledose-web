import type { ReactElement } from 'react';
/**
 * @file
 * This file defines the types and interfaces for the Button component.
 *
 * The button can have different sizes, colors, and actions.
 *
 * Example usage:
 * ```tsx
 * <Button
 *    actionType={ACTION_TYPE.FUNCTION_TRIGGER}
 *    variant={BUTTON_SIZE.DEFAULT}
 *    color={BUTTON_COLOR.BEIGE}
 *    text="Click me!"
 *    payload={() => console.log('Button clicked!')}
 *    isDisabled={false}
 *    icon="icon.svg"
 *  />
 * ```
 */

/**
 * Possible actions for a button.
 *
 * @remarks
 * - `FUNCTION_TRIGGER`: Executes a custom function.
 * - `SUBMIT`: Submits a form.
 * - `NAVIGATION`: Redirects to a navigation link.
 */
export enum ACTION_TYPE {
  FUNCTION_TRIGGER = 'function-trigger',
  SUBMIT = 'submit',
  NAVIGATION = 'navigation',
}

/**
 * Possible style variants for a button.
 *
 * @remarks
 * - `RED`: BAsic, red variant. Default style.
 * - `TRANSPARENT`: Secondary button style. For less important buttons.
 */
export enum BUTTON_VARIANT {
  RED = 'red',
  TRANSPARENT = 'transparent',
}

/**
 * Interface for button component props.
 *
 * @property actionType - Defines the action type of the button:
 *  - `ACTION_TYPE.FUNCTION_TRIGGER`
 *  - `ACTION_TYPE.SUBMIT`
 *  - `ACTION_TYPE.NAVIGATION`
 * @property text - Label or text displayed on the button.
 * @property payload - The function, URL, or form ID triggered by the button.
 * @property isDisabled - If true, disables the button.
 * @property fixedWidht - Optional width of a button in pixels.
 */
export interface ButtonProps {
  actionType: ACTION_TYPE;
  variant: BUTTON_VARIANT;
  text: string;
  payload?: string | (() => void);
  isDisabled?: boolean;
  fixedWidth?: number;
}

/**
 * This function selects the button type and its performed action.
 *
 * @param props - The button properties used to determine the button's behavior.
 *  - `actionType`: The type of action (submit, navigation, etc.).
 *  - `payload`: The function, form ID, or URL associated with the action.
 *  - `text`: Label text for the button.
 *  - `isDisabled`: Optionally disables the button.
 *
 * @returns A ReactElement showing the rendered button.
 */
export type ActionSelector = (props: ButtonProps) => ReactElement;

/**
 * @group Components
 */
export type Button = (props: ButtonProps) => ReactElement;
