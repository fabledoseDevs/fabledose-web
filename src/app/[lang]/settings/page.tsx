'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { type ReactElement, useEffect, useState } from 'react';

import SettingsPage from '@/components/templates/SettingsPage';
import { auth } from '@/config/firebase';
import Sidebar from '@/organisms/Sidebar';

const Home = (): ReactElement => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      router.replace('/login');
    }
  }, [authChecked, isLoggedIn, router]);

  if (!authChecked || !isLoggedIn) return <></>;

  return (
    <>
      <Sidebar />
      <SettingsPage />
    </>
  );
};

export default Home;
