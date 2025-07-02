import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the NewsletterForm component.
 */

/**
 * NewsletterForm component renders a footer element with newsletter subscription information.
 * It displays the Fabledose logo, a short description, a Substack button, and a disclaimer.
 *
 * @param props - The component properties:
 *  - `className`: Optional CSS class name for additional styling.
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <NewsletterForm />
 * ```
 */
export type NewsletterForm = () => ReactElement;
