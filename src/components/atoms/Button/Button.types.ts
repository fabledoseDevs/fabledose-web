/**
 * This component renders a button.
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

import type { ReactElement } from 'react';

export enum ACTION_TYPE {
  FUNCTION_TRIGGER = 'function-trigger', // Button that performs an action
  SUBMIT = 'submit', // Button that submits a form
  NAVIGATION = 'navigation', // Button that navigates to a different page
}

export interface ButtonProps {
  /**
   * Button type: either a button that performs an action,
   * submits a form, or navigates to a different page.
   */
  actionType: ACTION_TYPE;
  /**
   * Text to display on the button.
   */
  text: string;
  /**
   * Payload, either a function url or form id.
   * For the button of type ACTION_TYPE.FUNCTION_TRIGGER the payload should be a function.
   * For the button of type ACTION_TYPE.NAVIGATION the payload should be url.
   * For the button of type ACTION_TYPE.SUBMIT the payload should be form id.
   * If no payload is provided, the button will not perform any action.
   */
  payload?: string | (() => void);
  /**
   * If true, the button is disabled.
   */
  isDisabled?: boolean;
}

/**
 * This function selects the button type and performed action.
 */
export type ActionSelector = (props: ButtonProps) => ReactElement;

/**
 * @group Components
 */
export type Button = (props: ButtonProps) => ReactElement;
