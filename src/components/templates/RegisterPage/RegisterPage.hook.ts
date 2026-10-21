import { onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { auth } from '@/config/firebase';
import { useSettings } from '@/contexts/SettingsContext';

import type { RegisterPageState } from './RegisterPage.types';

export const useRegisterPage = (): RegisterPageState => {
  const router = useRouter();
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' ? 'pl' : 'en';
  const {
    settings,
    settingsLoadError,
    retrySettingsLoad,
    completeRegistration,
  } = useSettings();
  const [account, setAccount] = useState<string | null | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const pending = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, user =>
      setAccount(user?.uid ?? null),
    );
    return () => {
      mounted.current = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (account && settings && settings.registrationCompleted !== false) {
      router.replace(`/${locale}/library`);
    }
  }, [account, settings, locale, router]);

  const selectPlan = async () => {
    if (pending.current || !account || auth.currentUser?.uid !== account)
      return;
    pending.current = true;
    setIsSaving(true);
    setSaveError(false);
    try {
      await completeRegistration();
    } catch {
      if (mounted.current && auth.currentUser?.uid === account)
        setSaveError(true);
    } finally {
      pending.current = false;
      if (mounted.current) setIsSaving(false);
    }
  };

  return {
    showForm: account === null,
    showPlans: Boolean(account && settings?.registrationCompleted === false),
    isLoading:
      account === undefined ||
      Boolean(account && !settings && !settingsLoadError),
    settingsLoadError,
    retrySettingsLoad,
    isSaving,
    saveError,
    selectPlan,
  };
};
