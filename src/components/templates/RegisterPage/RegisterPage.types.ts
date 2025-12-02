import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the RegisterPage component.
 */

/**
 * Possible registration steps.
 * - STEP_1_REGISTER: Registration form stage.
 * - STEP_2_PLAN: Subscription plan stage.
 */
export enum REGISTRATION_STEP {
  STEP_1_REGISTER,
  STEP_2_PLAN,
}

/**
 * useRegistrationStep hook return values
 * @param registrationStep - Current registration step.
 * @param setRegistrationStep - Function to change the current registration step. It is passed
 * down to the child components <RegisterForm /> to change the step via onSuccess prop.
 */
export type useRegistrationStepReturnValues = {
  registrationStep: REGISTRATION_STEP;
  setRegistrationStep: (step: REGISTRATION_STEP) => void;
};
/**
 * useRegisterPage hook type definition
 */
export type useRegisterPage = () => useRegistrationStepReturnValues;

/**
 * This component renders registration page for the application.
 * The registration page includes:
 * - A registration form with registration steps
 * - Subscription plan selection
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <RegisterPage />
 * ```
 */
export type LoginPage = () => ReactElement;
