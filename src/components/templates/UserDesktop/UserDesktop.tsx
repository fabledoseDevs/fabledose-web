'use client';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
} from '@/atoms/Container/Container.types';
import { auth } from '@/config/firebase';
import Jumbotron from '@/organisms/Jumbotron';

import { UserDesktopBody } from './UserDesktop.styled';
import type { UserDesktop as UserDesktopType } from './UserDesktop.types';

export const UserDesktop: UserDesktopType = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to auth changes to reliably get the user on client
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) {
        setUserName(null);
        return;
      }
      // Prefer displayName, then email, then phoneNumber, then provider data, finally uid
      const fromProvider = user.providerData?.find(
        p => p.displayName || p.email,
      );
      const name =
        user.displayName ||
        user.email ||
        user.phoneNumber ||
        fromProvider?.displayName ||
        fromProvider?.email ||
        user.uid;
      setUserName(name ?? null);
    });
    return () => unsub();
  }, []);

  return (
    <UserDesktopBody>
      <Container
        containerType={CONTAINER_ELEMENT.SECTION}
        backgroundColor={BACKGROUND_COLOR.PURPLE}
      >
        <Jumbotron
          logo={true}
          headline={'Udane logowanie!'}
          paragraph={
            <>
              Zalogowałeś się jako {userName ?? '...'}
              <br />
              Kontent w przygotowaniu. Możesz się wylogować.
            </>
          }
          button={{
            actionType: ACTION_TYPE.FUNCTION_TRIGGER,
            variant: BUTTON_VARIANT.RED,
            width: {
              widthType: WIDTH_TYPE.AUTO,
            },
            text: 'Wyloguj Się',
            payload: async () => {
              try {
                await signOut(auth);
              } catch (e) {
                console.error('Sign out failed', e);
              }
            },
          }}
        />
      </Container>
    </UserDesktopBody>
  );
};
