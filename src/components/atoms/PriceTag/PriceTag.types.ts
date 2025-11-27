import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the PriceTag component.
 */

/**
 * Possible settlement periods for price tag.
 *
 * @remarks
 * - `MONTHLY` is used for price tag referring to a monthly payment.
 * - `YEARLY` is used for price tag referring to a yearly payment.
 */
export enum PERIOD {
  MONTHLY = 'm',
  YEARLY = 'y',
}

/**
 * Possible currencies for price tag.
 *
 * @remarks
 * - `USD` is used for price tag referring to USD currency.
 * - `PLN` is used for price tag referring to PLN currency.
 * - `EUR` is used for price tag referring to EUR currency.
 * - `GBP` is used for price tag referring to GBP currency.
 */
export enum CURRENCY {
  USD = 'USD',
  PLN = 'PLN',
  EUR = 'EUR',
  GBP = 'GBP',
}

/**
 * Interface for PriceTag component props.
 *
 * @property period - Settlement period for price tag. If left blank, period is not displayed.
 * @property currency - Currency for price tag.
 * @property value - Price value.
 */
export interface PriceTagProps {
  period?: PERIOD;
  currency: CURRENCY;
  value: number;
}

/**
 * Type signature of the currency and period selectors.
 */
export type CurrencySelector = (currency: CURRENCY) => string;
export type PeriodSelector = (period: PERIOD) => string;

/**
 * PriceTag component renders a price tag.
 * It has properties defining price value, settlement period and currency.
 *
 * @param props - The component properties:
 *  - `period`: Settlement period for price tag.
 *  - `currency`: Currency for price tag.
 *  - `value`: Price value.
 *
 *  @group Components
 *
 *  @example
 *  ```tsx
 *  <PriceTag
 *    period={PERIOD.MONTHLY}
 *    currency={CURRENCY.EUR}
 *    value={14,99}
 *  />
 *  ```
 */
export type PriceTag = (props: PriceTagProps) => ReactElement;
