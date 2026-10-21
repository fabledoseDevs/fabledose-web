import { sendPasswordResetEmail } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { auth } from '@/config/firebase';
import { useDictionary } from '@/lang/DictionaryProvider';

import type { PasswordResetState } from './PasswordResetForm.types';

export const usePasswordResetForm = (): PasswordResetState => {
  const { passwordResetPage: text } = useDictionary();
  const { lang } = useParams<{ lang: string }>();
  const [email, updateEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const pending = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const setEmail = (value: string) => {
    updateEmail(value);
    setError(null);
    setSent(false);
  };

  const handleSubmit: PasswordResetState['handleSubmit'] = async event => {
    event.preventDefault();
    if (pending.current) return;
    const address = email.trim();
    setError(null);
    setSent(false);
    if (!address || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setError(text.invalidEmail);
      return;
    }
    pending.current = true;
    setLoading(true);
    try {
      auth.languageCode = lang === 'pl' ? 'pl' : 'en';
      await sendPasswordResetEmail(auth, address);
      if (mounted.current) setSent(true);
    } catch (cause: unknown) {
      if (!mounted.current) return;
      const code =
        cause && typeof cause === 'object' && 'code' in cause
          ? cause.code
          : null;
      if (code === 'auth/user-not-found') setSent(true);
      else
        setError(
          code === 'auth/invalid-email'
            ? text.invalidEmail
            : code === 'auth/too-many-requests'
            ? text.tooManyRequests
            : code === 'auth/network-request-failed'
            ? text.networkError
            : text.failure,
        );
    } finally {
      pending.current = false;
      if (mounted.current) setLoading(false);
    }
  };

  return { email, setEmail, loading, error, sent, handleSubmit };
};
