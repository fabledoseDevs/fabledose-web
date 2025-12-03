import type { FormEvent, ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the LoginForm component.
 */

/**
 * Props for the LoginForm component.
 *
 * @property onSuccess - Called after a successful login (Google or Email/Password).
 * Use this to advance the app flow on the parent page.
 */
export interface LoginFormProps {
  onSuccess?: () => void;
}

/**
 * Return values of the internal useLoginForm hook.
 *
 * @remarks
 * This type describes the shape returned by a potential internal hook for the
 * LoginForm. It is documented here to keep typings centralized even if the
 * hook is not yet publicly used.
 *
 * @property email - Current email value entered by the user.
 * @property password - Current password value entered by the user.
 * @property loading - Loading state for async actions.
 * @property error - Global error message to display when an action fails.
 * @property setEmail - Update function for controlled email input.
 * @property setPassword - Update function for controlled password input.
 * @property handleGoogleSignIn - Triggers Google sign-in using Firebase.
 * @property handleSubmit - Handles form submit for email/password login.
 */
export interface UseLoginFormReturnValues {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleGoogleSignIn: HandleGoogleSignIn;
  handleSubmit: HandleSubmit;
}

/**
 * Type signature of the internal useLoginForm hook.
 */
export type UseLoginForm = (options?: {
  onSuccess?: () => void;
}) => UseLoginFormReturnValues;

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
 * Function type for handling the form submission that logs a user
 * in with email and password via Firebase.
 *
 * @param e - The HTML form submit event. Implementations should call
 * `e.preventDefault()` to avoid a full page reload and then perform
 * validation and login.
 *
 * @returns Promise that resolves once the login flow completes.
 */
export type HandleSubmit = (e: FormEvent<HTMLFormElement>) => Promise<void>;

/**
 * Component renders a login form with third‑party sign‑in buttons, a separator,
 * email and password inputs, and submit + helper actions.
 *
 * @param props - Component properties
 *  - `onSuccess`: Callback to execute after successful login.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 */
export type LoginForm = (props: LoginFormProps) => ReactElement;
