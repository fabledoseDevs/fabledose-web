import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the Avatar component.
 */

/**
 * Possible size variants for an avatar.
 *
 * @remarks
 * - `SMALL`: 40x40px avatar.
 * - `MEDIUM`: 60x60px avatar.
 * - `LARGE`: 80x80px avatar.
 */
export enum AVATAR_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

/**
 * Interface for avatar component props.
 *
 * @property imageUrl - URL of the profile image.
 * @property altText - Alternative text for the image for accessibility.
 * @property size - Optional size variant of the avatar. Defaults to MEDIUM.
 * @property isActive - If true, highlights the avatar with a border to indicate active state.
 * @property onClick - Optional click handler for the avatar.
 */
export interface AvatarProps {
  imageUrl: string;
  altText: string;
  size?: AVATAR_SIZE;
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * Component renders Avatar.
 * The avatar displays a circular profile image with optional active state highlighting.
 * @param props - The component properties:
 *  - `imageUrl`: URL of the profile image.
 *  - `altText`: Alternative text for the image.
 *  - `size`: Size variant of the avatar following {@link AVATAR_SIZE}.
 *  - `isActive`: If true, highlights the avatar as active.
 *  - `onClick`: Optional click handler.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Avatar
 *    imageUrl="/path/to/image.jpg"
 *    altText="User Name"
 *    size={AVATAR_SIZE.MEDIUM}
 *    isActive={true}
 *    onClick={() => console.log('Avatar clicked!')}
 *  />
 * ```
 */
export type Avatar = (props: AvatarProps) => ReactElement;
