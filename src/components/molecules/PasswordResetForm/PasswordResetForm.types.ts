import type { FormEvent, ReactElement } from 'react';

/** Password recovery state. Firebase handles the reset link and new-password screen.
 * No account-existence information is exposed by the confirmation message.
 */
export interface PasswordResetState {
  /** Controlled email address; whitespace is removed before sending. */
  email: string;
  /** Locks the form while a single email request is pending. */
  loading: boolean;
  /** Localized validation or service error; null after a successful request. */
  error: string | null;
  /** True after Firebase accepts the request, including an unknown account. */
  sent: boolean;
  /** Updates the email and clears messages belonging to the previous address. */
  setEmail: (email: string) => void;
  /** Prevents navigation, validates the address and sends one reset email at a time. */
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

/** Public password-recovery form, localized from the current route dictionary. */
export type PasswordResetForm = () => ReactElement;
