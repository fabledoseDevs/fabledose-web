import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useCallback, useMemo, useState } from 'react';

import { auth } from '@/config/firebase';

import type {
  HandleGoogleSignIn,
  HandleSubmit,
  UseRegisterForm as UseRegisterFormType,
} from './RegisterForm.types';

export const useRegisterForm: UseRegisterFormType = options => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordError = useMemo(() => {
    if (!confirmPassword && !password) return '';
    if (confirmPassword && password !== confirmPassword) {
      return 'Hasła nie są identyczne';
    }
    return '';
  }, [password, confirmPassword]);

  const handleGoogleSignIn = useCallback<HandleGoogleSignIn>(async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      options?.onSuccess?.();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : null;
      setError(message || 'Wystąpił błąd podczas logowania przez Google');
    } finally {
      setLoading(false);
    }
  }, [options]);

  const handleSubmit = useCallback<HandleSubmit>(
    async e => {
      e.preventDefault();
      setError(null);

      if (!email) {
        setError('Adres email jest wymagany');
        return;
      }
      if (!password) {
        setError('Hasło jest wymagane');
        return;
      }
      if (password !== confirmPassword) {
        setError('Hasła muszą być identyczne');
        return;
      }

      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        options?.onSuccess?.();
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : null;
        setError(message || 'Nie udało się utworzyć konta');
      } finally {
        setLoading(false);
      }
    },
    [email, password, confirmPassword, options],
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
