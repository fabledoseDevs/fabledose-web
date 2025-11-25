import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
} from '@/atoms/Container/Container.types';
import LoginForm from '@/molecules/LoginForm';

import { LoginPageBody } from './LoginPage.styled';
import type { LoginPage as LoginPageType } from './LoginPage.types';

export const LoginPage: LoginPageType = () => (
  <LoginPageBody>
    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
    >
      <LoginForm />
    </Container>
  </LoginPageBody>
);
