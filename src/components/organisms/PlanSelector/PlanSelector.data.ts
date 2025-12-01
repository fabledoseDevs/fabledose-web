import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import { CURRENCY, PERIOD } from '@/atoms/PriceTag/PriceTag.types';
import type { InfoCardExtendedProps } from '@/molecules/InfoCardExtended';
import type { InfoCardSimpleProps } from '@/molecules/InfoCardSimple';

export const CARDS_SIMPLE: [
  InfoCardSimpleProps,
  InfoCardSimpleProps,
  InfoCardSimpleProps,
] = [
  {
    title: 'Starter',
    description:
      'Dostęp do wyselekcjonowanej liczby bajek w formacie animowanej książki.',
    optionalParagraphs: [
      'Bajki w jakości: SD.',
      'Jeden profil użytkownika.',
      'Brak opłat',
      'Konto sponsorowane (zawiera reklamy).',
    ],
    priceParams: {
      period: PERIOD.MONTHLY,
      currency: CURRENCY.PLN,
      value: 0,
    },
    buttonParams: {
      text: 'Pozostaję przy Starter',
      variant: BUTTON_VARIANT.WHITE,
      actionType: ACTION_TYPE.FUNCTION_TRIGGER,
      payload: () => console.info('Starter selected...'),
      width: {
        widthType: WIDTH_TYPE.PERCENT,
        widthValue: 100,
      },
    },
  },
  {
    title: 'Family',
    description:
      'Dostęp do pełnej kolekcji bajek w formatach animowanej książki, audiobooków oraz ebooków.',
    optionalParagraphs: [
      'Bajki w jakości: SD, HD.',
      'Trzy profile dla dzieci.',
    ],
    priceParams: {
      period: PERIOD.MONTHLY,
      currency: CURRENCY.PLN,
      value: 14.99,
    },
    buttonParams: {
      text: 'Wybieram Family',
      variant: BUTTON_VARIANT.RED,
      actionType: ACTION_TYPE.FUNCTION_TRIGGER,
      payload: () => console.info('Family selected...'),
      width: {
        widthType: WIDTH_TYPE.PERCENT,
        widthValue: 100,
      },
    },
  },
  {
    title: 'Ultimate',
    description:
      'Dostęp do pełnej kolekcji bajek w formatach animowanej książki, audiobooków oraz ebooków.',
    optionalParagraphs: [
      'Bajki w jakości: SD, HD, 2K oraz 4K.',
      'Wiele profili dla dzieci.',
      'Licencja na pokazy publiczne.',
    ],
    priceParams: {
      period: PERIOD.MONTHLY,
      currency: CURRENCY.PLN,
      value: 29.99,
    },
    buttonParams: {
      text: 'Wybieram Ultimate',
      variant: BUTTON_VARIANT.RED,
      actionType: ACTION_TYPE.FUNCTION_TRIGGER,
      payload: () => console.info('Ultimate selected...'),
      width: {
        widthType: WIDTH_TYPE.PERCENT,
        widthValue: 100,
      },
    },
  },
];

export const CARDS_EXTENDED: [
  InfoCardExtendedProps,
  InfoCardExtendedProps,
  InfoCardExtendedProps,
] = [
  {
    title: 'Starter',
    sectionContent: {
      title: 'Dostęp do treści',
      paragraph: 'Dostęp do wybranych tytułów w następujących formatach:',
      list: ['animowana książka'],
    },
    sectionQuality: {
      title: 'Jakość bajek',
      list: ['SD (720p)'],
    },
    sectionChildrenAccounts: {
      title: 'Liczba kont dla dzieci',
      paragraph: 'Tylko konto podstawowe.',
    },
    sectionLicensing: {
      title: 'Rodzaj licencji',
      paragraph:
        'Konto zawiera licencję na pokazy prywatne, wyłącznie w gronie najbliższej rodziny.',
    },
    price: {
      currency: CURRENCY.PLN,
      value: 0,
    },
  },
  {
    title: 'Family',
    sectionContent: {
      title: 'Dostęp do treści',
      paragraph: 'Pełen dostęp do tytułów w następujących formatach:',
      list: ['animowana książka', 'audiobook', 'ebook'],
    },
    sectionQuality: {
      title: 'Jakość bajek',
      list: ['SD (720p)', 'HD (1080p)'],
    },
    sectionChildrenAccounts: {
      title: 'Liczba kont dla dzieci',
      paragraph: 'Trzy.',
    },
    sectionLicensing: {
      title: 'Rodzaj licencji',
      paragraph:
        'Konto zawiera licencję na pokazy prywatne, wyłącznie w gronie najbliższej rodziny',
    },
    price: {
      currency: CURRENCY.PLN,
      value: 14.99,
    },
  },
  {
    title: 'Ultimate',
    sectionContent: {
      title: 'Dostęp do treści',
      paragraph: 'Full access to titles in the following formats:',
      list: ['Animated book', 'Audiobook', 'E-book'],
    },
    sectionQuality: {
      title: 'Jakość bajek',
      list: ['SD (720p)', 'HD (1080p)', '2K', '4K'],
    },
    sectionChildrenAccounts: {
      title: 'Liczba kont dla dzieci',
      paragraph: 'Bez ograniczeń.',
    },
    sectionLicensing: {
      title: 'Rodzaj licencji',
      paragraph:
        'Konto zawiera licencję na pokazy prywatne oraz publiczne. Ciesz się treściami Fabledose bez ograniczeń!',
    },
    price: {
      currency: CURRENCY.PLN,
      value: 29.99,
    },
  },
];
