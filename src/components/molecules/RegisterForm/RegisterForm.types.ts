import type { FormEvent, ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the RegisterForm component.
 */

/**
 * Props for the RegisterForm component.
 *
 * @property onSuccess - Called after a successful registration (Google or Email/Password).
 * Use this to advance the registration flow on the parent page.
 */
export interface RegisterFormProps {
  onSuccess?: () => void;
}

/**
 * Return values of the internal useRegisterForm hook.
 *
 * @remarks
 * This type describes the shape returned by a potential internal hook for the
 * RegisterForm. It is documented here to keep typings centralized even if the
 * hook is not yet publicly used.
 *
 * @property email - Current email value entered by the user.
 * @property password - Current password value entered by the user.
 * @property confirmPassword - Password confirmation value.
 * @property loading - Loading state for async actions.
 * @property error - Global error message to display when an action fails.
 * @property passwordError - Inline validation error specific to password mismatch.
 * @property setEmail - Update function for controlled email input.
 * @property setPassword - Update function for controlled password input.
 * @property setConfirmPassword - Update function for controlled password confirmation input.
 * @property handleGoogleSignIn - Triggers Google sign-in using Firebase.
 * @property handleSubmit - Handles form submit for email/password registration.
 */
export interface UseRegisterFormReturnValues {
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string | null;
  passwordError: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirm: string) => void;
  handleGoogleSignIn: HandleGoogleSignIn;
  handleSubmit: HandleSubmit;
}

/**
 * Type signature of the internal useRegisterForm hook.
 */
export type UseRegisterForm = (options?: {
  onSuccess?: () => void;
}) => UseRegisterFormReturnValues;

/**
 * Function type for triggering Google sign-in via Firebase.
 *
 * @remarks
 * Implementations should set any necessary loading/error state and resolve
 * only after the authentication flow has completed (successfully or not).
 *
 * @returns Promise that resolves once the flow completes.
 */
export type HandleGoogleSignIn = () => Promise<void>;

/**
 * Function type for handling the form submission that registers a user
 * with email and password via Firebase.
 *
 * @param e - The HTML form submit event. Implementations should call
 * `e.preventDefault()` to avoid a full page reload and then perform
 * validation and registration.
 *
 * @returns Promise that resolves once the registration flow completes.
 */
export type HandleSubmit = (e: FormEvent<HTMLFormElement>) => Promise<void>;

/**
 * Component renders a login form with third‑party sign‑in buttons,
 * email and password inputs.
 *
 * @param props - Component properties
 *  - `onSuccess`: Callback to execute after successful registration.
 *  Use this to advance the registration flow on the parent page.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */
export type RegisterForm = (props: RegisterFormProps) => ReactElement;
