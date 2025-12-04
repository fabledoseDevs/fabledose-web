'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { type ReactElement, useEffect, useState } from 'react';

import UserDesktop from '@/components/templates/UserDesktop';
import { auth } from '@/config/firebase';

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

  return <UserDesktop />;
};

export default Home;
