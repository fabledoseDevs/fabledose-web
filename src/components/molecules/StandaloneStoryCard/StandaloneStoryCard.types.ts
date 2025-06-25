import type { ReactElement } from 'react';

import type { BasicDescriptionProps } from '@/atoms/BasicDescription';
import type { ButtonProps } from '@/atoms/Button/Button.types';

/**
 * @module
 * This file defines the types and interfaces for the StandaloneStoryCard component.
 */

/**
 * Interface for StandaloneStoryCard component props.
 *
 * @property descriptionData - Data for the BasicDescription component, including headline, description, and button properties.
 * @property buttonData - Data for the Button component, including action type, variant, text, and other button properties.
 * @property imageData - Properties for the image to be displayed, including the source and alt text.
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
 * StandaloneStoryCard component displays a preview of a fable with image and description.
 *
 * @param props - The component properties:
 *  - `descriptionData`: Data for the text part of the story card. Needs to follow a pattern of {@link BasicDescriptionProps}.
 *  - `buttonData`: Data for the button displayed below the description. Needs to follow a pattern of {@link ButtonProps}.
 *  - `imageData`: Data for the image part of the story card.
 *
 * @returns A ReactElement showing the rendered story card with description, button, and image.
 *
 * @group Component
 *
 * @example
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
export type StandaloneStoryCard = (
  props: StandaloneStoryCardProps,
) => ReactElement;
