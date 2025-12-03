'use client';

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { auth } from '@/config/firebase';

import type {
  HandleGoogleSignIn,
  HandleSubmit,
  UseLoginForm,
} from './LoginForm.types';

export const useLoginForm: UseLoginForm = options => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn: HandleGoogleSignIn = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      if (options?.onSuccess) {
        options.onSuccess();
      } else {
        router.push('/');
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Google sign-in failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [options, router]);

  const handleSubmit: HandleSubmit = useCallback(
    async e => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        if (options?.onSuccess) {
          options.onSuccess();
        } else {
          router.push('/');
        }
      } catch (e: unknown) {
        const message =
          e instanceof Error ? e.message : 'Email/password sign-in failed';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [email, password, options, router],
  );

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleGoogleSignIn,
    handleSubmit,
  };
};

export default useLoginForm;
