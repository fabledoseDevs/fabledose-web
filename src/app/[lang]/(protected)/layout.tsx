'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import { type ReactElement, type ReactNode, useEffect, useState } from 'react';

import { auth } from '@/config/firebase';
import { useSettings } from '@/contexts/SettingsContext';
import Sidebar from '@/organisms/Sidebar';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({
  children,
}: ProtectedLayoutProps): ReactElement | null => {
  const { settings, settingsLoadError } = useSettings();
  const router = useRouter();
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' ? 'pl' : 'en';
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(Boolean(user));
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      router.replace(`/${locale}/login`);
    } else if (
      authChecked &&
      isLoggedIn &&
      (settings?.registrationCompleted === false || settingsLoadError)
    ) {
      router.replace(`/${locale}/register`);
    }
  }, [authChecked, isLoggedIn, locale, router, settings, settingsLoadError]);

  if (
    !authChecked ||
    !isLoggedIn ||
    !settings ||
    settings.registrationCompleted === false ||
    settingsLoadError
  ) {
    return null;
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default ProtectedLayout;
