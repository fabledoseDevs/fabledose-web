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
    </Container>
  </RegisterPageBody>
);
