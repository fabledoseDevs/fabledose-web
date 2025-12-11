'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { type ReactElement, useEffect, useState } from 'react';

import LandingPage from '@/components/templates/LandingPage';
import Maintenance from '@/components/templates/Maintenance';
import { auth } from '@/config/firebase';
import type { DictionaryType } from '@/lang/lang.types';

interface HomeClientProps {
  dict: DictionaryType;
}

export const LandingPageClient = ({ dict }: HomeClientProps): ReactElement => {
  const router = useRouter();
  const [showMaintenance, setShowMaintenance] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/library');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      {showMaintenance ? (
        <Maintenance dict={dict.maintenance} />
      ) : (
        <LandingPage
          dict={dict.landingPage}
          dictCommon={dict.common}
          dictFooter={dict.footer}
        />
      )}
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          opacity: '0.1',
          zIndex: 9999,
        }}
        onClick={() => setShowMaintenance(false)}
      />
    </>
  );
};
