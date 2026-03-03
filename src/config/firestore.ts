import { doc, getDoc, setDoc } from 'firebase/firestore';

import type { Settings } from '@/contexts/SettingsContext.types';

import { db } from './firebase';

export const getUserSettings = async (
  userId: string,
): Promise<Settings | null> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().settings as Settings;
  } else {
    return null;
  }
};

export const updateUserSettings = async (
  userId: string,
  settings: Partial<Settings>,
): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  await setDoc(docRef, { settings }, { merge: true });
};
