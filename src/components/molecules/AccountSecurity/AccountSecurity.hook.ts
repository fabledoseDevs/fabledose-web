import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { auth } from '@/config/firebase';
import { useSettings } from '@/contexts/SettingsContext';
import { useDictionary } from '@/lang/DictionaryProvider';

import type {
  AccountAction,
  AccountSecurityState,
} from './AccountSecurity.types';

export const useAccountSecurity = (
  action: AccountAction,
): AccountSecurityState => {
  const {
    settingsPage: { accountSecurity: text },
  } = useDictionary();
  const {
    settings,
    hasPasswordProvider,
    updateUserEmail,
    updateUserPassword,
    deleteAccount,
    refreshAccountEmail,
  } = useSettings();
  const { lang } = useParams<{ lang: string }>();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const busy = useRef(false);
  const mounted = useRef(true);
  const owner = useRef(auth.currentUser?.uid);
  const requestedEmail = useRef('');
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const report = (cause: unknown) => {
    const code =
      cause && typeof cause === 'object' && 'code' in cause ? cause.code : '';
    const errors: Record<string, string> = {
      'auth/wrong-password': text.wrongPassword,
      'auth/invalid-credential': text.wrongPassword,
      'auth/missing-password': text.required,
      'auth/weak-password': text.weakPassword,
      'auth/password-does-not-meet-requirements': text.weakPassword,
      'auth/invalid-email': text.invalidEmail,
      'auth/email-already-in-use': text.emailInUse,
      'auth/requires-recent-login': text.recentLogin,
      'functions/failed-precondition': text.recentLogin,
      'auth/popup-closed-by-user': text.popupCancelled,
      'auth/cancelled-popup-request': text.popupCancelled,
      'auth/popup-blocked': text.popupBlocked,
      'auth/user-mismatch': text.accountChanged,
      'auth/too-many-requests': text.tooManyRequests,
      'functions/resource-exhausted': text.tooManyRequests,
      'auth/network-request-failed': text.networkError,
      'functions/unavailable': text.serviceUnavailable,
      'functions/not-found': text.serviceUnavailable,
      'functions/aborted': text.deletionIncomplete,
      'functions/unauthenticated': text.recentLogin,
      'auth/operation-not-allowed': text.unsupported,
    };
    setError(
      typeof code === 'string' ? errors[code] || text.failure : text.failure,
    );
  };

  const submit = async () => {
    if (busy.current || success) return;
    setError('');
    if (owner.current !== auth.currentUser?.uid || !owner.current) {
      setError(text.accountChanged);
      return;
    }
    if (hasPasswordProvider && !password) {
      setError(text.required);
      return;
    }
    if (action === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        setError(text.invalidEmail);
        return;
      }
      if (value.trim() === settings?.email) {
        setError(text.sameEmail);
        return;
      }
    }
    if (action === 'password' && (!value || !confirmation)) {
      setError(text.required);
      return;
    }
    if (action === 'password' && value !== confirmation) {
      setError(text.mismatch);
      return;
    }
    if (action === 'delete' && !acknowledged) {
      setError(text.confirmDeletion);
      return;
    }
    busy.current = true;
    setPending(true);
    try {
      if (action === 'email') {
        await updateUserEmail(value, password);
        requestedEmail.current = value.trim();
      } else if (action === 'password')
        await updateUserPassword(password, value);
      else await deleteAccount(password);
      if (!mounted.current) return;
      if (
        action === 'delete' &&
        auth.currentUser &&
        auth.currentUser.uid !== owner.current
      ) {
        setError(text.accountChanged);
        return;
      }
      setPassword('');
      setValue('');
      setConfirmation('');
      if (action === 'delete')
        router.replace(`/${lang === 'pl' ? 'pl' : 'en'}/login`);
      else setSuccess(text[action].success);
    } catch (cause: unknown) {
      if (mounted.current) report(cause);
    } finally {
      busy.current = false;
      if (mounted.current) setPending(false);
    }
  };

  const refreshEmail = async () => {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError('');
    try {
      const changed = await refreshAccountEmail();
      if (mounted.current)
        setSuccess(
          changed || auth.currentUser?.email === requestedEmail.current
            ? text.emailConfirmed
            : text.email.success,
        );
    } catch (cause: unknown) {
      if (mounted.current) report(cause);
    } finally {
      busy.current = false;
      if (mounted.current) setPending(false);
    }
  };

  return {
    pending,
    error,
    success,
    hasPasswordProvider,
    password,
    setPassword,
    value,
    setValue,
    confirmation,
    setConfirmation,
    acknowledged,
    setAcknowledged,
    submit,
    refreshEmail,
  };
};
