import { useState } from 'react';

import type { useRegisterPage as useRegisterPageType } from './RegisterPage.types';
import { REGISTRATION_STEP } from './RegisterPage.types';

export const useRegisterPage: useRegisterPageType = () => {
  const [registrationStep, setRegistrationStep] = useState(
    REGISTRATION_STEP.STEP_1_REGISTER,
  );

  return { registrationStep, setRegistrationStep };
};
