'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { type ReactElement, useEffect, useState } from 'react';

import LandingPage from '@/components/templates/LandingPage';
import Maintenance from '@/components/templates/Maintenance';
import UserDesktop from '@/components/templates/UserDesktop';
import { auth } from '@/config/firebase';

const Home = (): ReactElement => {
  const [showMaintenance, setShowMaintenance] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  return (
    <>
      {showMaintenance ? (
        <Maintenance />
      ) : isLoggedIn ? (
        <UserDesktop />
      ) : (
        <LandingPage />
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

export default Home;
