import type { ReactElement } from 'react';

/** Sensitive action selected from account settings. Null keeps the modal unmounted. */
export type AccountAction = 'email' | 'password' | 'delete';

/** Props for a security dialog. Closing unmounts the form and clears credentials. */
export interface AccountSecurityProps {
  /** Operation requiring fresh password or Google reauthentication. */
  action: AccountAction;
  /** Called after cancellation or a successful non-destructive action. */
  onClose: () => void;
}

/** Local form state; passwords are never persisted outside this mounted form. */
export interface AccountSecurityState {
  /** True while confirmation and the selected operation are running. */
  pending: boolean;
  /** Localized service or validation error. */
  error: string;
  /** Localized confirmation retained until the dialog closes. */
  success: string;
  /** Password authentication is shown only when linked to this account. */
  hasPasswordProvider: boolean;
  /** Current password used only for reauthentication. */
  password: string;
  setPassword: (value: string) => void;
  /** Requested email or new password depending on the action. */
  value: string;
  setValue: (value: string) => void;
  /** New-password confirmation, checked before contacting Firebase. */
  confirmation: string;
  setConfirmation: (value: string) => void;
  /** Explicit acknowledgement of permanent account removal. */
  acknowledged: boolean;
  setAcknowledged: (value: boolean) => void;
  /** Validates and submits a single operation, suppressing duplicate requests. */
  submit: () => Promise<void>;
  /** Checks whether a verification link has changed the confirmed email. */
  refreshEmail: () => Promise<void>;
}

/** Reusable email, password and permanent deletion dialog. */
export type AccountSecurity = (props: AccountSecurityProps) => ReactElement;
