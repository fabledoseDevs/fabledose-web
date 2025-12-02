import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
} from '@/atoms/Container/Container.types';
import RegisterForm from '@/molecules/RegisterForm';
import PlanSelector from '@/organisms/PlanSelector';

import { useRegisterPage } from './RegisterPage.hook';
import {
  BackgroundImage,
  Gradient,
  RegisterPageBody,
} from './RegisterPage.styled';
import type { LoginPage as LoginPageType } from './RegisterPage.types';
import { REGISTRATION_STEP } from './RegisterPage.types';

export const RegisterPage: LoginPageType = () => {
  const { registrationStep, setRegistrationStep } = useRegisterPage();

  return (
    <RegisterPageBody>
      <BackgroundImage
        src="/jumbo-static.jpg"
        alt="Jumbotron background"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />
      <Gradient />
      <Container
        containerType={CONTAINER_ELEMENT.SECTION}
        backgroundColor={BACKGROUND_COLOR.PURPLE}
        alignItems={FLEX_ALIGNMENT.CENTER}
        maxWidth={1440}
      >
        {registrationStep === REGISTRATION_STEP.STEP_1_REGISTER ? (
          <RegisterForm
            onSuccess={() => setRegistrationStep(REGISTRATION_STEP.STEP_2_PLAN)}
          />
        ) : (
          <></>
        )}
        {registrationStep === REGISTRATION_STEP.STEP_2_PLAN ? (
          <PlanSelector />
        ) : (
          <></>
        )}
      </Container>
    </RegisterPageBody>
  );
};
