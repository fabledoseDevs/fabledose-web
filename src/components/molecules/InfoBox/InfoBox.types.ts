import type { ReactElement } from 'react';

/**
 * @file
 * This file defines the types and interfaces for the InfoBox component.
 *
 * The InfoBox displays an image with a title and description in a styled container.
 *
 * Example usage:
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

/**
 * Interface for InfoBox component props.
 *
 * @property imageData - Object containing image source and alt text
 *   - src: URL of the image to display
 *   - alt: Alternative text for the image
 * @property title - Title text to display below the image
 * @property description - Description text to display below the title
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
 * @group Components
 */
export type InfoBox = (props: InfoBoxProps) => ReactElement;
