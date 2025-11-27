import type { ReactElement } from 'react';

import type { ButtonProps } from '@/atoms/Button/Button.types';
import type { PriceTagProps } from '@/atoms/PriceTag';

/**
 * @module
 * This file defines the types and interfaces for the InfoCardSimple component.
 */

/**
 * Interface for InfoCardSimple component props.
 *
 * @property title - Title text.
 * @property description - Description text to display below the title.
 * @property optionalParagraphs - Optional array of paragraphs to display below the description.
 * @property priceParams - PriceTag component props.
 * @property buttonParams - Button component props.
 */
export interface InfoCardSimpleProps {
  title: string;
  description: string;
  optionalParagraphs?: string[];
  priceParams: PriceTagProps;
  buttonParams: ButtonProps;
}

/**
 * InfoCardSimple component displays a card with a title, description and clickable button.
 * It also displays a price tag and optional paragraphs.
 *
 * @param props - The component properties:
 *  - `title`: Title text.
 *  - `description`: Description text to display below the title.
 *  - `optionalParagraphs`: Optional array of paragraphs to display below the description.
 *  - `priceParams`: PriceTag component props.
 *  - `buttonParams`: Button component props.
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <InfoCardSimple
 *   title="Family Plan"
 *   description="Lorem ipsum sit amet consectetur adipiscing elit."
 *   optionalParagraphs={["Fables in SD and HD quality", "Single user profile"]}
 *   priceParams={{
 *     period: PERIOD.MONTHLY,
 *     currency: CURRENCY.EUR,
 *     value: 14.99
 *   }}
 *   buttonParams={{
 *     text: "Choose Plan",
 *     variant: BUTTON_VARIANT.RED,
 *     actionType: ACTION_TYPE.NAVIGATION,
 *     payload: "/signup"
 *   }}
 * />
 */
export type InfoCardSimple = (props: InfoCardSimpleProps) => ReactElement;
