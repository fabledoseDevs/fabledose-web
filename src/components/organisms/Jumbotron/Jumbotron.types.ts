import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the Jumbotron component.
 *
 * The Jumbotron is a full-screen hero component that displays a background image
 * with centered content including a headline, paragraph, and call-to-action button.
 */

/**
 * Component renders a full-screen Jumbotron with a background image and centered content.
 * The Jumbotron includes:
 * - A full-screen background image (jumbo-static.jpg)
 * - A headline with JUMBO type and WHITE color
 * - A paragraph with centered text
 * - A call-to-action button
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <Jumbotron />
 * ```
 */
export type Jumbotron = () => ReactElement;
