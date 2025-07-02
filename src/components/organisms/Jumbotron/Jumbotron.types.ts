import type { ReactElement } from 'react';

import type { ButtonProps } from '@/atoms/Button/Button.types';

/**
 * @module
 * This file defines the types and interfaces for the Jumbotron component.
 *
 * The Jumbotron is a full-screen hero component that displays a background image
 * with centered content including a headline, paragraph, and call-to-action button.
 */

/**
 * Props for the Jumbotron component
 *
 * @property {boolean} [logo=false] - Whether to display the logo at the top of the jumbotron
 * @property {string} headline - The headline text to display
 * @property {string} paragraph - The paragraph text to display
 * @property {ButtonProps} button - Props for the call-to-action button
 */
export interface JumbotronProps {
  logo?: boolean;
  headline: string;
  paragraph: string;
  button: ButtonProps;
}

/**
 * Component renders a full-screen Jumbotron with a background image and centered content.
 * The Jumbotron includes:
 * - A full-screen background image (jumbo-static.jpg)
 * - Optionally, a logo (when logo prop is true)
 * - A headline with JUMBO type and WHITE color
 * - A paragraph with centered text and WHITE color
 * - A call-to-action button with customizable properties
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <Jumbotron
 *   logo={true}
 *   headline="Welcome to our platform"
 *   paragraph="Discover amazing content and features designed just for you."
 *   button={{
 *     text: "Get Started",
 *     variant: BUTTON_VARIANT.RED,
 *     actionType: ACTION_TYPE.NAVIGATION,
 *     payload: "/signup"
 *   }}
 * />
 * ```
 */
export type Jumbotron = (props: JumbotronProps) => ReactElement;
