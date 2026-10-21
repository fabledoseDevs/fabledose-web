import Button from '@/atoms/Button';
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
import { useDictionary } from '@/lang/DictionaryProvider';
import RegisterForm from '@/molecules/RegisterForm';
import PlanSelector from '@/organisms/PlanSelector';

import { useRegisterPage } from './RegisterPage.hook';
import {
  BackgroundImage,
  Gradient,
  RegisterPageBody,
  RegistrationStatus,
} from './RegisterPage.styled';
import type { LoginPage as LoginPageType } from './RegisterPage.types';

export const RegisterPage: LoginPageType = () => {
  const flow = useRegisterPage();
  const {
    registerPage: { flow: text },
  } = useDictionary();

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
        <>
          {flow.isLoading && (
            <RegistrationStatus role="status">
              {text.loading}
            </RegistrationStatus>
          )}
          {flow.settingsLoadError && (
            <div role="alert">
              <RegistrationStatus>{text.loadError}</RegistrationStatus>
              <Button
                text={text.retry}
                width={{ widthType: WIDTH_TYPE.AUTO }}
                actionType={ACTION_TYPE.FUNCTION_TRIGGER}
                variant={BUTTON_VARIANT.WHITE}
                payload={flow.retrySettingsLoad}
              />
            </div>
          )}
          {flow.showForm && <RegisterForm />}
          {flow.showPlans && (
            <PlanSelector
              onPlanSelected={flow.selectPlan}
              isDisabled={flow.isSaving}
            />
          )}
          {flow.isSaving && (
            <RegistrationStatus role="status">{text.saving}</RegistrationStatus>
          )}
          {flow.saveError && (
            <RegistrationStatus role="alert">
              {text.saveError}
            </RegistrationStatus>
          )}
        </>
      </Container>
    </RegisterPageBody>
  );
};
