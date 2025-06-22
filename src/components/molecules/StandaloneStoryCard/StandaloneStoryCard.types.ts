import type { ReactElement } from 'react';

import type { BasicDescriptionProps } from '@/atoms/BasicDescription';
import type { ButtonProps } from '@/atoms/Button/Button.types';

/**
 * @file
 * This file defines the types and interfaces for the StandaloneStoryCard component.
 *
 * The StandaloneStoryCard displays a story with a description and an image side by side.
 * On mobile devices, the layout changes to a column.
 *
 * Example usage:
 * ```tsx
 * <StandaloneStoryCard
 *   descriptionData={{
 *     superText: 'Lorem Ipsum',
 *     headline: 'Sit amet sentensula falgahta',
 *     paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id eros a odio hendrerit ultrices ac sed urna. Vivamus sit amet massa sit amet ante dignissim consectetur ac eu mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sit amet fermentum elit.',
 *   }}
 *   buttonData={{
 *     actionType: ACTION_TYPE.NAVIGATION,
 *     variant: BUTTON_VARIANT.RED,
 *     text: 'Read More',
 *     payload: '/stories/example-story'
 *   }}
 *   imageData={{
 *     src: "/images/story-image.jpg",
 *     alt: "Story image description"
 *   }}
 * />
 * ```
 */

/**
 * Interface for StandaloneStoryCard component props.
 *
 * @property descriptionData - Data for the BasicDescription component, including headline, description, and button properties.
 * @property buttonData - Data for the Button component, including action type, variant, text, and other button properties.
 * @property imageData - Properties for the image to be displayed, including source and alt text.
 */
export interface StandaloneStoryCardProps {
  descriptionData: BasicDescriptionProps;
  buttonData: ButtonProps;
  imageData: {
    src: string;
    alt: string;
  };
}

/**
 * StandaloneStoryCard component displays a story with text and image.
 *
 * @param props - The component properties:
 *  - `descriptionData`: Data for the text part of the story card
 *  - `buttonData`: Data for the button displayed below the description
 *  - `imageData`: Data for the image part of the story card
 *
 * @returns A ReactElement showing the rendered story card with description, button, and image.
 *
 * @group Components
 */
export type StandaloneStoryCard = (
  props: StandaloneStoryCardProps,
) => ReactElement;
