import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import { CURRENCY, PERIOD } from '@/atoms/PriceTag/PriceTag.types';
import type { UserPlan } from '@/contexts/SettingsContext.types';
import type { DictionaryType } from '@/lang/dictionaries/lang.types';
import type { InfoCardExtendedProps } from '@/molecules/InfoCardExtended';
import type { InfoCardSimpleProps } from '@/molecules/InfoCardSimple';

type PlanSelectorDictionary = DictionaryType['registerPage']['planSelector'];

export const createSimpleCards = (
  planSelector: PlanSelectorDictionary,
  onPlanSelect: (plan: UserPlan) => void,
): [InfoCardSimpleProps, InfoCardSimpleProps, InfoCardSimpleProps] => [
  {
    title: planSelector.plans.free.title,
    description: planSelector.plans.free.description,
    optionalParagraphs: planSelector.plans.free.optionalParagraphs,
    priceParams: {
      period: PERIOD.MONTHLY,
      currency: CURRENCY.PLN,
      value: 0,
    },
    buttonParams: {
      text: planSelector.plans.free.button,
      variant: BUTTON_VARIANT.WHITE,
      actionType: ACTION_TYPE.FUNCTION_TRIGGER,
      payload: () => onPlanSelect('free'),
      width: {
        widthType: WIDTH_TYPE.PERCENT,
        widthValue: 100,
      },
    },
  },
  {
    title: planSelector.plans.family.title,
    description: planSelector.plans.family.description,
    optionalParagraphs: planSelector.plans.family.optionalParagraphs,
    priceParams: {
      period: PERIOD.MONTHLY,
      currency: CURRENCY.PLN,
      value: 14.99,
    },
    buttonParams: {
      text: planSelector.plans.family.button,
      variant: BUTTON_VARIANT.RED,
      actionType: ACTION_TYPE.FUNCTION_TRIGGER,
      payload: () => onPlanSelect('family'),
      width: {
        widthType: WIDTH_TYPE.PERCENT,
        widthValue: 100,
      },
    },
  },
  {
    title: planSelector.plans.ultimate.title,
    description: planSelector.plans.ultimate.description,
    optionalParagraphs: planSelector.plans.ultimate.optionalParagraphs,
    priceParams: {
      period: PERIOD.MONTHLY,
      currency: CURRENCY.PLN,
      value: 29.99,
    },
    buttonParams: {
      text: planSelector.plans.ultimate.button,
      variant: BUTTON_VARIANT.RED,
      actionType: ACTION_TYPE.FUNCTION_TRIGGER,
      payload: () => onPlanSelect('ultimate'),
      width: {
        widthType: WIDTH_TYPE.PERCENT,
        widthValue: 100,
      },
    },
  },
];

export const createExtendedCards = (
  planSelector: PlanSelectorDictionary,
): [InfoCardExtendedProps, InfoCardExtendedProps, InfoCardExtendedProps] => [
  {
    title: planSelector.plans.free.title,
    sectionContent: {
      title: planSelector.extended.contentTitle,
      paragraph: planSelector.extended.free.contentParagraph,
      list: planSelector.extended.free.contentList,
    },
    sectionQuality: {
      title: planSelector.extended.qualityTitle,
      list: planSelector.extended.free.qualityList,
    },
    sectionChildrenAccounts: {
      title: planSelector.extended.childrenTitle,
      paragraph: planSelector.extended.free.childrenParagraph,
    },
    sectionLicensing: {
      title: planSelector.extended.licenseTitle,
      paragraph: planSelector.extended.free.licenseParagraph,
    },
    price: {
      currency: CURRENCY.PLN,
      value: 0,
    },
    monthlyCostLabel: planSelector.extended.monthlyCostLabel,
  },
  {
    title: planSelector.plans.family.title,
    sectionContent: {
      title: planSelector.extended.contentTitle,
      paragraph: planSelector.extended.family.contentParagraph,
      list: planSelector.extended.family.contentList,
    },
    sectionQuality: {
      title: planSelector.extended.qualityTitle,
      list: planSelector.extended.family.qualityList,
    },
    sectionChildrenAccounts: {
      title: planSelector.extended.childrenTitle,
      paragraph: planSelector.extended.family.childrenParagraph,
    },
    sectionLicensing: {
      title: planSelector.extended.licenseTitle,
      paragraph: planSelector.extended.family.licenseParagraph,
    },
    price: {
      currency: CURRENCY.PLN,
      value: 14.99,
    },
    monthlyCostLabel: planSelector.extended.monthlyCostLabel,
  },
  {
    title: planSelector.plans.ultimate.title,
    sectionContent: {
      title: planSelector.extended.contentTitle,
      paragraph: planSelector.extended.ultimate.contentParagraph,
      list: planSelector.extended.ultimate.contentList,
    },
    sectionQuality: {
      title: planSelector.extended.qualityTitle,
      list: planSelector.extended.ultimate.qualityList,
    },
    sectionChildrenAccounts: {
      title: planSelector.extended.childrenTitle,
      paragraph: planSelector.extended.ultimate.childrenParagraph,
    },
    sectionLicensing: {
      title: planSelector.extended.licenseTitle,
      paragraph: planSelector.extended.ultimate.licenseParagraph,
    },
    price: {
      currency: CURRENCY.PLN,
      value: 29.99,
    },
    monthlyCostLabel: planSelector.extended.monthlyCostLabel,
  },
];
