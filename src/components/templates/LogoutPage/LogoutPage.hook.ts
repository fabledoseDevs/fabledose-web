import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { auth } from '@/config/firebase';

import type {
  HandleCancel as HandleCancelType,
  HandleLogout as HandleLogoutType,
  useLogoutPage as useLogoutPageType,
} from './LogoutPage.types';

export const useLogoutPage: useLogoutPageType = () => {
  const router = useRouter();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCancel: HandleCancelType = () => {
    router.back();
  };

  const handleLogout: HandleLogoutType = async () => {
    try {
      await signOut(auth);
      setIsLoggedOut(true);
      timeoutRef.current = setTimeout(() => router.push('/'), 3000);
    } catch (e) {
      console.error('Sign out failed', e);
      router.push('/');
    }
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return { handleCancel, handleLogout, isLoggedOut };
};
