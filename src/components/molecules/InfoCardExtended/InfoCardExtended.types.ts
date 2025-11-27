import type { ReactElement } from 'react';

import type { PriceTagProps } from '@/atoms/PriceTag';

/**
 * @module
 * This file defines the types and interfaces for the InfoCardExtended component.
 */

export interface InfoCardSection {
  title: string;
  paragraph?: string;
  list?: string[];
}

/**
 * Interface for InfoCardExtended component props.
 *
 * @property title - Title text.
 * @property sectionContent - Section with available content description.
 * @property sectionQuality - Section with available quality of content description.
 * @property sectionChildrenAccounts - Section informing about number of children accounts available.
 * @property sectionLicensing - Section with licensing information.
 */
export interface InfoCardExtendedProps {
  title: string;
  sectionContent: InfoCardSection;
  sectionQuality: InfoCardSection;
  sectionChildrenAccounts: InfoCardSection;
  sectionLicensing: InfoCardSection;
  price: PriceTagProps;
}

/**
 * InfoCardExtended component displays a card with a title, description and clickable button.
 * It also displays a price tag and optional paragraphs.
 *
 * @param props - The component properties:
 *  - `title`: Title text.
 *  - `sectionContent`: Section with available content description.
 *  - `sectionQuality`: Section with available quality of content description.
 *  - `sectionChildrenAccounts`: Section informing about number of children accounts available.
 *  - `sectionLicensing`: Section with licensing information.
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <InfoCardExtended
 *   title="Family Plan"
 *   sectionContent={{
 *      title: "Content access",
 *      paragraph: "Full access to titles in the following formats:",
 *      list: ["Animated book", "Audiobook", "E-book"],
 *   }}
 *   sectionQuality={{
 *      title: "Quality",
 *      list: ["SD (720p)", "HD (1080p)"],
 *   }}
 *   sectionChildrenAccounts={{
 *      title: "Children accounts",
 *      paragraph: "Three.",
 *   }}
 *   sectionLicensing={{
 *      title: "Licensing",
 *      paragraph: "The account includes a license for private viewing, limited to immediate family only.",
 *   }}
 *   priceParams={{
 *     period: PERIOD.MONTHLY,
 *     currency: CURRENCY.EUR,
 *     value: 14.99
 *   }}
 * />
 */
export type InfoCardExtended = (props: InfoCardExtendedProps) => ReactElement;
