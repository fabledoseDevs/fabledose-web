import type { ReactElement } from 'react';

import type { ButtonProps } from '@/atoms/Button/Button.types';
import type { InfoCardExtendedProps } from '@/molecules/InfoCardExtended/InfoCardExtended.types';

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
export interface PlanComparisonExtendedProps {
  accountCards: [
    InfoCardExtendedProps,
    InfoCardExtendedProps,
    InfoCardExtendedProps,
  ];
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
 *       sectionContent: {
 *        title: "Content access",
 *        paragraph: "Limited access to titles in the following formats:",
 *        list: ["Animated book"]
 *       },
 *       sectionQuality: {
 *        title: "Quality",
 *        list: ["SD (720p)"],
 *       },
 *       sectionChildrenAccounts: {
 *        title: "Children accounts",
 *        paragraph: "One.",
 *       },
 *       sectionLicensing: {
 *        title: "Licensing",
 *        paragraph: "Free for non-commercial use.",
 *       },
 *       priceParams: {
 *         period: PERIOD.MONTHLY,
 *         currency: CURRENCY.EUR,
 *         value: 0
 *       }
 *     },
 *     {
 *       title: "Family Plan",
 *       sectionContent: {
 *        title: "Content access",
 *        paragraph: "Full access to titles in the following formats:",
 *        list: ["Animated book", "Audiobook", "E-book"]
 *       },
 *       sectionQuality: {
 *        title: "Quality",
 *        list: ["SD (720p)", "HD (1080p)"],
 *       },
 *       sectionChildrenAccounts: {
 *        title: "Children accounts",
 *        paragraph: "Three.",
 *       },
 *       sectionLicensing: {
 *        title: "Licensing",
 *        paragraph: "Free for non-commercial use.",
 *       },
 *       priceParams: {
 *         period: PERIOD.MONTHLY,
 *         currency: CURRENCY.EUR,
 *         value: 14.99
 *       }
 *     },
 *     {
 *       title: "Family Plan",
 *       sectionContent: {
 *        title: "Content access",
 *        paragraph: "Full access to titles in the following formats:",
 *        list: ["Animated book", "Audiobook", "E-book"]
 *       },
 *       sectionQuality: {
 *        title: "Quality",
 *        list: ["SD (720p)", "HD (1080p)", 2K, 4K],
 *       },
 *       sectionChildrenAccounts: {
 *        title: "Children accounts",
 *        paragraph: "Unlimited",
 *       },
 *       sectionLicensing: {
 *        title: "Licensing",
 *        paragraph: "Free for family and public use.",
 *       },
 *       priceParams: {
 *         period: PERIOD.MONTHLY,
 *         currency: CURRENCY.EUR,
 *         value: 29.99
 *       }
 *     },
 *   ]}
 * />
 */
export type PlanComparisonSimple = (
  props: PlanComparisonExtendedProps,
) => ReactElement;
