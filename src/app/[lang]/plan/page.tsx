'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import { type ReactElement, useEffect, useState } from 'react';

import PlanPage from '@/components/templates/PlanPage';
import { auth } from '@/config/firebase';

const Plan = (): ReactElement => {
  const router = useRouter();
  const params = useParams();
  const currentLang = (params?.lang as string) || 'en';
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
    <PlanPage
      onPlanSelected={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }

        router.push(`/${currentLang}/settings`);
      }}
    />
  );
};

export default Plan;
