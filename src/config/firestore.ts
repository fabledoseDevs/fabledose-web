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
};

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
): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'favorites', fableId);
  await setDoc(docRef, {
    fableId,
    addedAt: Date.now(),
  });
};

export const removeFavorite = async (
  userId: string,
  fableId: string,
): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'favorites', fableId);
  await deleteDoc(docRef);
};

export const getFavorites = async (userId: string): Promise<FavoriteData[]> => {
  const collectionRef = collection(db, 'users', userId, 'favorites');
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map(doc => doc.data() as FavoriteData);
};

export const updateReadingProgress = async (
  userId: string,
  fableId: string,
  currentSlide: number,
  isCompleted = false,
): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'readingProgress', fableId);
  await setDoc(docRef, {
    fableId,
    currentSlide,
    lastUpdated: Date.now(),
    isCompleted,
  });
};

export const getReadingProgress = async (
  userId: string,
  fableId: string,
): Promise<ReadingProgressData | null> => {
  const docRef = doc(db, 'users', userId, 'readingProgress', fableId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as ReadingProgressData) : null;
};

export const getContinueReading = async (
  userId: string,
): Promise<ReadingProgressData[]> => {
  const collectionRef = collection(db, 'users', userId, 'readingProgress');
  const q = query(collectionRef, where('isCompleted', '==', false));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => doc.data() as ReadingProgressData)
    .sort((a, b) => b.lastUpdated - a.lastUpdated);
};
