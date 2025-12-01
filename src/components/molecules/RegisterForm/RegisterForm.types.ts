import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the RegisterForm component.
 */

/**
 * Props for the RegisterForm component.
 *
 * Currently, the component does not accept any external props.
 */

/**
 * Return values of the internal useLoginForm hook.
 *
 * @remarks
 * This type describes the shape returned by a potential internal hook for the
 * RegisterForm. It is documented here to keep typings centralized even if the
 * hook is not yet publicly used.
 */
export interface UseRegisterFormReturnValues {
  /** Example default state flag maintained by the form hook. */
  defaultState: boolean;
}

/**
 * Type signature of the internal useLoginForm hook.
 */
export type UseRegisterForm = () => UseRegisterFormReturnValues;

/**
 * Component renders a login form with third‑party sign‑in buttons, a separator,
 * email and password inputs, and submit + helper actions.
 *
 * @param props - Component properties (currently none).
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */
export type RegisterForm = () => ReactElement;
