'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import { type ReactElement, type ReactNode, useEffect, useState } from 'react';

import { auth } from '@/config/firebase';
import Sidebar from '@/organisms/Sidebar';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps): ReactElement | null {
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
    }
  }, [authChecked, isLoggedIn, locale, router]);

  if (!authChecked || !isLoggedIn) {
    return null;
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
