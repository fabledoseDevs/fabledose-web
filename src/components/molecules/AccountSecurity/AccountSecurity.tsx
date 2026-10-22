import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Paragraph from '@/atoms/Paragraph';
import {
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFormField,
  PasswordModalActions,
  PasswordModalContent,
  PasswordModalError,
} from '@/components/templates/SettingsPage/SettingsPage.styled';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';

import { useAccountSecurity } from './AccountSecurity.hook';
import type { AccountSecurity as AccountSecurityType } from './AccountSecurity.types';

export const AccountSecurity: AccountSecurityType = ({ action, onClose }) => {
  const {
    settingsPage: { accountSecurity: text },
  } = useDictionary();
  const state = useAccountSecurity(action);
  const close = () => {
    if (!state.pending) onClose();
  };
  return (
    <ModalWindow
      isOpen
      onClose={close}
      closeOnOverlayClick={!state.pending}
      title={text[action].title}
    >
      <PasswordModalContent
        as="form"
        onSubmit={event => {
          event.preventDefault();
          void state.submit();
        }}
        aria-busy={state.pending}
      >
        <Paragraph>{text[action].description}</Paragraph>
        {!state.success && (
          <>
            {state.hasPasswordProvider ? (
              <PasswordFormField>
                <PasswordFieldLabel htmlFor="account-current-password">
                  {text.currentPassword}
                </PasswordFieldLabel>
                <PasswordFieldInput
                  id="account-current-password"
                  type="password"
                  autoComplete="current-password"
                  value={state.password}
                  onChange={event => state.setPassword(event.target.value)}
                  disabled={state.pending}
                  autoFocus
                />
              </PasswordFormField>
            ) : (
              <Paragraph>{text.googleConfirmation}</Paragraph>
            )}
            {action !== 'delete' && (
              <PasswordFormField>
                <PasswordFieldLabel htmlFor="account-new-value">
                  {action === 'email' ? text.newEmail : text.newPassword}
                </PasswordFieldLabel>
                <PasswordFieldInput
                  id="account-new-value"
                  type={action === 'email' ? 'email' : 'password'}
                  autoComplete={action === 'email' ? 'email' : 'new-password'}
                  value={state.value}
                  onChange={event => state.setValue(event.target.value)}
                  disabled={state.pending}
                />
              </PasswordFormField>
            )}
            {action === 'password' && (
              <PasswordFormField>
                <PasswordFieldLabel htmlFor="account-password-confirmation">
                  {text.confirmPassword}
                </PasswordFieldLabel>
                <PasswordFieldInput
                  id="account-password-confirmation"
                  type="password"
                  autoComplete="new-password"
                  value={state.confirmation}
                  onChange={event => state.setConfirmation(event.target.value)}
                  disabled={state.pending}
                />
              </PasswordFormField>
            )}
            {action === 'delete' && (
              <PasswordFieldLabel>
                <input
                  type="checkbox"
                  checked={state.acknowledged}
                  onChange={event =>
                    state.setAcknowledged(event.target.checked)
                  }
                  disabled={state.pending}
                />{' '}
                {text.confirmDeletion}
              </PasswordFieldLabel>
            )}
          </>
        )}
        {state.success && (
          <div role="status">
            <Paragraph>{state.success}</Paragraph>
          </div>
        )}
        {state.error && (
          <PasswordModalError role="alert">{state.error}</PasswordModalError>
        )}
        <PasswordModalActions>
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.WHITE}
            text={state.success ? text.close : text.cancel}
            payload={close}
            isDisabled={state.pending}
            width={{ widthType: WIDTH_TYPE.AUTO }}
          />
          {state.success && action === 'email' && (
            <Button
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              variant={BUTTON_VARIANT.RED}
              text={text.checkEmail}
              payload={state.refreshEmail}
              isDisabled={state.pending}
              width={{ widthType: WIDTH_TYPE.AUTO }}
            />
          )}
          {!state.success && (
            <Button
              actionType={ACTION_TYPE.SUBMIT}
              variant={BUTTON_VARIANT.RED}
              text={state.pending ? text.working : text[action].submit}
              isDisabled={
                state.pending || (action === 'delete' && !state.acknowledged)
              }
              width={{ widthType: WIDTH_TYPE.AUTO }}
            />
          )}
        </PasswordModalActions>
      </PasswordModalContent>
    </ModalWindow>
  );
};
