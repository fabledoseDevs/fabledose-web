import type { ReactElement } from 'react';

import type { ButtonProps } from '@/atoms/Button/Button.types';
import type { InfoCardSimpleProps } from '@/molecules/InfoCardSimple/InfoCardSimple.types';

/**
 * @file
 * This file defines the types and interfaces for the PlanComparisonExtended component.
 * It renders three account cards side by side and an alternative button.
 */

/**
 * Interface for PlanComparisonExtended component props.
 *
 * @property accountCards - Array of account cards.
 * @property button - Optional button to be displayed below the cards.
 */
export interface PlanComparisonSimpleProps {
  accountCards: [InfoCardSimpleProps, InfoCardSimpleProps, InfoCardSimpleProps];
  button?: ButtonProps;
}

/**
 * PlanComparisonExtended component displays three account cards side by side and an alternative button.
 * @param props - The component properties:
 *  - `accountCards`: Array of account cards.
 *  - `button`: Optional button to be displayed below the cards.
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <PlanComparisonExtended
 *   accountCards={[
 *     {
 *       title: "Starter Plan",
 *       description: "Lorem ipsum sit amet consectetur adipiscing elit.",
 *       optionalParagraphs: ["Fables in SD", "Single user profile"],
 *       priceParams: {
 *         period: PERIOD.MONTHLY,
 *         currency: CURRENCY.EUR,
 *         value: 0
 *       }
 *     },
 *     {
 *       title: "Family Plan",
 *       description: "Lorem ipsum sit amet consectetur adipiscing elit.",
 *       optionalParagraphs: ["Fables in SD and HD quality", "Single user profile"],
 *       priceParams: {
 *         period: PERIOD.MONTHLY,
 *         currency: CURRENCY.EUR,
 *         value: 14.99
 *       }
 *     },
 *     {
 *       title: "Ultimate Plan",
 *       description: "Lorem ipsum sit amet consectetur adipiscing elit.",
 *       optionalParagraphs: ["Fables in SD and HD quality", "Multi users profile"],
 *       priceParams: {
 *         period: PERIOD.MONTHLY,
 *         currency: CURRENCY.EUR,
 *         value: 29.99
 *       }
 *     },
 *   ]}
 *   button={{
 *     text: "Choose Plan",
 *     variant: BUTTON_VARIANT.RED,
 *     actionType: ACTION_TYPE.FUNCTION_TRIGGER,
 *     payload: expandAccountDescription(),
 *   }}
 * />
 */
export type PlanComparisonSimple = (
  props: PlanComparisonSimpleProps,
) => ReactElement;
