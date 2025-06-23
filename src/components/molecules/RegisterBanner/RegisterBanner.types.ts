import type { ReactElement } from 'react';

import type { FableTileProps } from '@/molecules/FableTile';

/**
 * @file
 * This file defines the types and interfaces for the RegisterBanner component.
 *
 * The RegisterBanner displays a call-to-action section with a title, registration button,
 * and a slider of fable covers.
 *
 * Example usage:
 * ```tsx
 * <RegisterBanner
 *   title="Join our community today!"
 *   covers={[
 *     {
 *       imageUrl: "/images/fable1.jpg",
 *       fableTitle: "Złotowłosa",
 *       fableId: "zlotowlosa-i-trzy-misie"
 *     },
 *     {
 *       imageUrl: "/images/fable2.jpg",
 *       fableTitle: "Czerwony Kapturek",
 *       fableId: "czerwony-kapturek"
 *     }
 *   ]}
 * />
 * ```
 */

/**
 * Interface for RegisterBanner component props.
 *
 * @property title - The title text displayed in the banner. Can contain HTML that will be rendered.
 * @property covers - An array of fable tiles to be displayed in the slider. Each cover requires imageUrl, fableTitle, and fableId.
 */
export interface RegisterBannerProps {
  title: string;
  covers: FableTileProps[];
}

/**
 * @group Components
 */
export type RegisterBanner = (props: RegisterBannerProps) => ReactElement;
