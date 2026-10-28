import {
  type FirestoreError,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { Settings } from '@/contexts/SettingsContext.types';

import { db } from './firebase';
import { profilePath } from './profileScope';
import { createWriteQueue } from './writeQueue';

const enqueueWrite = createWriteQueue();

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
): Promise<void> =>
  enqueueWrite(`settings/${userId}`, async () => {
    const docRef = doc(db, 'users', userId);
    const updateData: Record<string, unknown> = {};

    Object.entries(settings).forEach(([key, value]) => {
      updateData[`settings.${key}`] = value;
    });

    try {
      await updateDoc(docRef, updateData);
    } catch (error: unknown) {
      // If document doesn't exist, create it
      if ((error as FirestoreError).code === 'not-found') {
        await setDoc(docRef, { settings }, { merge: true });
      } else {
        throw error;
      }
    }
  });

export interface FavoriteData {
  fableId: string;
  addedAt: number;
}

export interface ReadingProgressData {
  fableId: string;
  currentSlide: number;
  lastUpdated: number;
  isCompleted: boolean;
}

export const addFavorite = async (
  userId: string,
  fableId: string,
  profileId?: string | null,
): Promise<void> => {
  const docRef = doc(
    db,
    `${profilePath(userId, profileId)}/favorites/${fableId}`,
  );
  await setDoc(docRef, {
    fableId,
    addedAt: Date.now(),
  });
};

export const removeFavorite = async (
  userId: string,
  fableId: string,
  profileId?: string | null,
): Promise<void> => {
  const docRef = doc(
    db,
    `${profilePath(userId, profileId)}/favorites/${fableId}`,
  );
  await deleteDoc(docRef);
};

export const getFavorites = async (
  userId: string,
  profileId?: string | null,
): Promise<FavoriteData[]> => {
  const collectionRef = collection(
    db,
    `${profilePath(userId, profileId)}/favorites`,
  );
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map(doc => doc.data() as FavoriteData);
};

export const updateReadingProgress = async (
  userId: string,
  fableId: string,
  currentSlide: number,
  isCompleted = false,
  profileId?: string | null,
): Promise<void> =>
  enqueueWrite(
    `progress/${profilePath(userId, profileId)}/${fableId}`,
    async () => {
      const docRef = doc(
        db,
        `${profilePath(userId, profileId)}/readingProgress/${fableId}`,
      );
      await setDoc(
        docRef,
        {
          fableId,
          currentSlide,
          lastUpdated: Date.now(),
          isCompleted,
        },
        { merge: true },
      );
    },
  );

export const getReadingProgress = async (
  userId: string,
  fableId: string,
  profileId?: string | null,
): Promise<ReadingProgressData | null> => {
  const docRef = doc(
    db,
    `${profilePath(userId, profileId)}/readingProgress/${fableId}`,
  );
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  const data = docSnap.data() as ReadingProgressData;
  return Number.isInteger(data.currentSlide) && data.currentSlide >= 0
    ? data
    : null;
};

export const getContinueReading = async (
  userId: string,
  profileId?: string | null,
): Promise<ReadingProgressData[]> => {
  await enqueueWrite.waitForPrefix(
    `progress/${profilePath(userId, profileId)}/`,
  );
  const collectionRef = collection(
    db,
    `${profilePath(userId, profileId)}/readingProgress`,
  );
  const q = query(collectionRef, where('isCompleted', '==', false));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => doc.data() as ReadingProgressData)
    .filter(
      item => Number.isInteger(item.currentSlide) && item.currentSlide >= 0,
    )
    .sort((a, b) => b.lastUpdated - a.lastUpdated);
};

/** Waits for acknowledged reading writes before a cached position can be resumed. */
export const waitForReadingProgressWrites = (
  userId: string,
  fableId: string,
  profileId?: string | null,
): Promise<void> =>
  enqueueWrite.waitFor(`progress/${profilePath(userId, profileId)}/${fableId}`);
