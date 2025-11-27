import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
} from '@/atoms/Container/Container.types';
import { CURRENCY, PERIOD } from '@/atoms/PriceTag/PriceTag.types';
import { InfoCardExtended } from '@/molecules/InfoCardExtended/InfoCardExtended';
import InfoCardSimple from '@/molecules/InfoCardSimple';

import { RegisterPageBody } from './RegisterPage.styled';
import type { LoginPage as LoginPageType } from './RegisterPage.types';

export const RegisterPage: LoginPageType = () => (
  <RegisterPageBody>
    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.WHITE}
      alignItems={FLEX_ALIGNMENT.CENTER}
    >
      <InfoCardSimple
        title={'Family'}
        description={
          'Dostęp do pełnej kolekcji bajek w formatach animowanej książki, audiobooków oraz ebooków.'
        }
        optionalParagraphs={[
          'Bajki w jakości: SD, HD.',
          'Jeden profil użytkownika.',
        ]}
        priceParams={{
          period: PERIOD.MONTHLY,
          currency: CURRENCY.PLN,
          value: 14.99,
        }}
        buttonParams={{
          actionType: ACTION_TYPE.FUNCTION_TRIGGER,
          variant: BUTTON_VARIANT.RED,
          text: 'Wybieram Family',
          payload: () => console.info('family plan choosen'),
          width: {
            widthType: WIDTH_TYPE.PERCENT,
            widthValue: 100,
          },
        }}
      />

      <InfoCardExtended
        title={'Family'}
        sectionContent={{
          title: 'Content access',
          paragraph: 'Full access to titles in the following formats:',
          list: ['Animated book', 'Audiobook', 'E-book'],
        }}
        sectionQuality={{ title: 'Quality', list: ['SD (720p)', 'HD (1080p)'] }}
        sectionChildrenAccounts={{
          title: 'Children accounts',
          paragraph: 'Three.',
        }}
        sectionLicensing={{
          title: 'Licensing',
          paragraph:
            'The account includes a license for private viewing, limited to immediate family only.',
        }}
        price={{
          currency: CURRENCY.EUR,
          value: 14.99,
        }}
      />
    </Container>
  </RegisterPageBody>
);
