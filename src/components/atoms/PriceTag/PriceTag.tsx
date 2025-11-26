import {
  Currency,
  Period,
  Price,
  PriceRow,
  PriceTagBody,
} from './PriceTag.styled';
import type {
  CurrencySelector as CurrencySelectorType,
  PeriodSelector as PeriodSelectorType,
  PriceTag as PriceTagType,
} from './PriceTag.types';
import { CURRENCY, PERIOD } from './PriceTag.types';

export const currencySelector: CurrencySelectorType = currency => {
  switch (currency) {
    case CURRENCY.EUR:
      return 'EUR';
    case CURRENCY.GBP:
      return 'GBP';
    case CURRENCY.USD:
      return 'USD';
    case CURRENCY.PLN:
      return 'PLN';
    default:
      return 'EUR';
  }
};

export const periodSelector: PeriodSelectorType = period => {
  switch (period) {
    case PERIOD.MONTHLY:
      return 'miesięcznie';
    case PERIOD.YEARLY:
      return 'rocznie';
  }
};

export const PriceTag: PriceTagType = ({ period, currency, value }) => (
  <PriceTagBody>
    <PriceRow>
      <Price>{value}</Price>
      <Currency>{currencySelector(currency)}</Currency>
    </PriceRow>
    {period && <Period>{periodSelector(period)}</Period>}
  </PriceTagBody>
);
