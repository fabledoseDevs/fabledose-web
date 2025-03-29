/**
 * This component renders a button.
 */

import type {ReactElement} from 'react';

export enum ACTION_TYPE {
  FUNCTION_TRIGGER = 'function-trigger',      // Button that performs an action
  SUBMIT = 'submit',                          // Button that submits a form
  NAVIGATION = 'navigation',                  // Button that navigates to a different page
}

export enum BUTTON_SIZE {
  DEFAULT = 'default',          // Standard size button
  FLUFFY = 'fluffy',            // Big button with large text
}

export enum BUTTON_COLOR {
  BEIGE = 'beige',              // #FAF0DD
  DENIM = 'denim',              // #316372
  WASABI = 'wasabi',            // #7F8A27
  CORAL = 'coral',              // #D1504E
}

export interface ButtonProps {
  /**
   * Button type: either a button that performs an action,
   * submits a form, or navigates to a different page.
   */
  actionType: ACTION_TYPE;
  /**
   * Variant of the button.
   */
  variant: BUTTON_SIZE;
  /**
   * Color of the button.
   */
  color: BUTTON_COLOR;
  /**
   * Text to display on the button.
   */
  text: string;
  /**
   * Optional icon to display on left side of the button.
   */
  icon?: string;
  /**
   * Payload, either a function, url or form id.
   * For button of type ACTION_TYPE.FUNCTION_TRIGGER the payload should be a function.
   * For button of type ACTION_TYPE.NAVIGATION the payload should be url.
   * For button of type ACTION_TYPE.SUBMIT the payload should be form id.
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
export type actionSelector = (
  variant: BUTTON_SIZE,                          // Button size
  color: BUTTON_COLOR,                           // Button color
  actionType: ACTION_TYPE,                       // Button type
  text: string,                                  // Button text
  payload: string | (() => void) | undefined,    // Button payload
  isDisabled: boolean,                           // Button disabled state
  icon: string | undefined,                      // Button icon
) => ReactElement | null;

/**
 * @group Components
 */
export type Button = (props: ButtonProps) => ReactElement;
