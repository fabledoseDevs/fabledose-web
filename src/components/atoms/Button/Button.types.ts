import type { ReactElement } from 'react';
/**
 * @module
 * This file defines the types and interfaces for the Button component.
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
 * - `WHITE`: Whiteish gradient background from #FFFFFF to #FAF0DD.
 */
export enum BUTTON_VARIANT {
  RED = 'red',
  TRANSPARENT = 'transparent',
  WHITE = 'white',
}

/**
 * Possible width types for the button sizing.
 * - PX: width in pixels
 * - PERCENT: width in percentage
 * - AUTO: automatic width based on content
 */
export enum WIDTH_TYPE {
  PX = 'px',
  PERCENT = 'percent',
  AUTO = 'auto',
}

/**
 * Width specification object used by Button to determine its CSS width.
 *
 * @property widthType - One of WIDTH_TYPE.PX, WIDTH_TYPE.PERCENT, WIDTH_TYPE.AUTO
 * @property widthValue - Numeric value for PX or PERCENT types (ignored for AUTO)
 */
export interface WidthSpec {
  widthType: WIDTH_TYPE;
  widthValue?: number;
}

/**
 * Interface for button component props.
 *
 * @property actionType - Defines the action type of the button:
 *  - `ACTION_TYPE.FUNCTION_TRIGGER`
 *  - `ACTION_TYPE.SUBMIT`
 *  - `ACTION_TYPE.NAVIGATION`
 * @property variant - Possible style variants for a button.
 * @property text - Label or text displayed on the button.
 * @property payload - The function, URL, or form ID triggered by the button.
 * @property isDisabled - If true, disables the button.
 * @property width - Optional width specification object controlling the CSS width.
 * @property iconUrl - Optional URL for an icon to display next to the text.
 * @property iconSizeOverride - Optional icon width in pixels. When provided, icon height is set to auto.
 */
export interface ButtonProps {
  actionType: ACTION_TYPE;
  variant: BUTTON_VARIANT;
  text: string;
  payload?: string | (() => void);
  isDisabled?: boolean;
  width: WidthSpec;
  iconUrl?: string;
  iconSizeOverride?: number;
}

/**
 * This function selects the button type and its performed action.
 *
 * @param props - The button properties used to determine the button's behavior.
 *  - `actionType`: The type of action (submit, navigation, etc.).
 *  - `payload`: The function, form ID, or URL associated with the action.
 *  - `text`: Label text for the button.
 *  - `isDisabled`: Optionally disables the button.
 *  - `iconUrl`: Optional URL for an icon to display next to the text.
 *  - `iconSizeOverride`: Optional icon width in pixels. When set, icon height is auto.
 *
 * @returns A ReactElement showing the rendered button.
 */
export type ActionSelector = (props: ButtonProps) => ReactElement;

/**
 * Component renders Button.
 * The button can have different sizes, colors, and actions.
 * @param props - The component properties:
 *  - `actionType`: Defines the action type of the button. Needs to follow a pattern of {@link ACTION_TYPE}.
 *  - `variant`: Possible style variants for a button. Needs to follow a pattern of {@link BUTTON_VARIANT}.
 *  - `text`: String to be displayed on the button.
 *  - `payload`: The function, URL, or form ID triggered by the button.
 *  - `isDisabled`: If true, disables the button.
 *  - `fixedWidth`: Optional width of a button in pixels.
 *  - `iconUrl`: Optional URL for an icon to display next to the text in 24x24 format.
 *  - `iconSizeOverride`: Optional icon width in pixels. When set, icon height is auto.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Button
 *    actionType={ACTION_TYPE.FUNCTION_TRIGGER}
 *    variant={BUTTON_SIZE.DEFAULT}
 *    text="Click me!"
 *    payload={() => console.log('Button clicked!')}
 *    isDisabled={false}
 *    iconUrl="/path/to/icon.svg"
 *  />
 * ```
 */
export type Button = (props: ButtonProps) => ReactElement;
