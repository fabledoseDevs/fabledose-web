import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useCallback, useMemo, useState } from 'react';

import { auth } from '@/config/firebase';
import { useDictionary } from '@/lang/DictionaryProvider';

import type {
  HandleGoogleSignIn,
  HandleSubmit,
  UseRegisterForm as UseRegisterFormType,
} from './RegisterForm.types';

export const useRegisterForm: UseRegisterFormType = options => {
  const { registerPage } = useDictionary();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordError = useMemo(() => {
    if (!confirmPassword && !password) return '';
    if (confirmPassword && password !== confirmPassword) {
      return registerPage.form.passwordMismatch;
    }
    return '';
  }, [confirmPassword, password, registerPage.form.passwordMismatch]);

  const handleGoogleSignIn = useCallback<HandleGoogleSignIn>(async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      options?.onSuccess?.();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : null;
      setError(message || registerPage.form.googleError);
    } finally {
      setLoading(false);
    }
  }, [options, registerPage.form.googleError]);

  const handleSubmit = useCallback<HandleSubmit>(
    async e => {
      e.preventDefault();
      setError(null);

      if (!email) {
        setError(registerPage.form.requiredEmail);
        return;
      }
      if (!password) {
        setError(registerPage.form.requiredPassword);
        return;
      }
      if (password !== confirmPassword) {
        setError(registerPage.form.passwordMustMatch);
        return;
      }

      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        options?.onSuccess?.();
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : null;
        setError(message || registerPage.form.createAccountError);
      } finally {
        setLoading(false);
      }
    },
    [
      confirmPassword,
      email,
      options,
      password,
      registerPage.form.createAccountError,
      registerPage.form.passwordMustMatch,
      registerPage.form.requiredEmail,
      registerPage.form.requiredPassword,
    ],
  );

  return {
    email,
    password,
    confirmPassword,
    loading,
    error,
    passwordError,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleGoogleSignIn,
    handleSubmit,
  };
};

export default useRegisterForm;
