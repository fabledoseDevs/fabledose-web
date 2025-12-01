import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
  PADDING,
} from '@/atoms/Container/Container.types';
import PlanSelector from '@/organisms/PlanSelector';

import { RegisterPageBody } from './RegisterPage.styled';
import type { LoginPage as LoginPageType } from './RegisterPage.types';

export const RegisterPage: LoginPageType = () => (
  <RegisterPageBody>
    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
      alignItems={FLEX_ALIGNMENT.CENTER}
      verticalPadding={PADDING.DOUBLE}
      maxWidth={1440}
    >
      <PlanSelector />
    </Container>
  </RegisterPageBody>
);
