import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the InfoBox component.
 */

/**
 * Interface for InfoBox component props.
 *
 * @property imageData - Object containing image source and alt text.
 *   - src: URL of the image to display.
 *   - alt: Alternative text for the image.
 * @property title - Title text to display below the image.
 * @property description - Description text to display below the title.
 */
export interface InfoBoxProps {
  imageData: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
}

/**
 * The InfoBox displays an image with a title and description that informs the end user about a desired topic.
 *
 * @param props - The component properties:
 *  - `imageData`: Object containing image source and alt text.
 *  - `title`: Title text to display below the image.
 *  - `description`: Description text to display below the title.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <InfoBox
 *   imageData={{
 *     src: "/images/example.jpg",
 *     alt: "Example image"
 *   }}
 *   title="Example Title"
 *   description="This is an example description for the InfoBox component."
 * />
 * ```
 */
export type InfoBox = (props: InfoBoxProps) => ReactElement;
