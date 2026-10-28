import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  setDoc,
  writeBatch,
} from 'firebase/firestore';

import { normalizeChildPolicy } from './childPolicy';
import type { ChildPolicy } from './childPolicy.types';
import type { ChildProfile, ChildProfileDraft } from './childProfiles.types';
import { db } from './firebase';
import { profilePath } from './profileScope';

export const PROFILE_AVATARS = Array.from(
  { length: 12 },
  (_, index) => `/avatars/av${index + 1}.jpg`,
);
export const PROFILE_AGES: ChildProfile['ageGroup'][] = [
  '',
  '0-4',
  '5-7',
  '8-10',
  '11+',
];

/** Validates user input before it can reach Firestore. */
export const normalizeChildProfile = (
  draft: ChildProfileDraft,
): ChildProfileDraft => {
  const name = draft.name.trim();
  if (
    !name ||
    name.length > 40 ||
    !PROFILE_AVATARS.includes(draft.imageUrl) ||
    !PROFILE_AGES.includes(draft.ageGroup)
  )
    throw new Error('Invalid child profile');
  return { name, imageUrl: draft.imageUrl, ageGroup: draft.ageGroup };
};

export const createChildProfile = async (
  uid: string,
  draft: ChildProfileDraft,
): Promise<string> => {
  const data = normalizeChildProfile(draft);
  const reference = doc(collection(db, `${profilePath(uid)}/childProfiles`));
  await setDoc(reference, { ...data, createdAt: Date.now() });
  return reference.id;
};

export const editChildProfile = async (
  uid: string,
  id: string,
  draft: ChildProfileDraft,
): Promise<void> => {
  const data = normalizeChildProfile(draft);
  const reference = doc(db, profilePath(uid, id));
  await runTransaction(db, async transaction => {
    const snapshot = await transaction.get(reference);
    if (!snapshot.exists() || snapshot.data().deleting)
      throw new Error('Profile unavailable');
    transaction.update(reference, data);
  });
};

/** Tombstone first; retry safely resumes cleanup after any interrupted batch. */
export const deleteChildProfile = async (
  uid: string,
  id: string,
): Promise<void> => {
  const base = profilePath(uid, id);
  const reference = doc(db, base);
  if (!(await getDoc(reference)).exists()) return;
  await runTransaction(db, async transaction => {
    const snapshot = await transaction.get(reference);
    if (snapshot.exists()) transaction.update(reference, { deleting: true });
  });
  const favorites = await getDocs(collection(db, `${base}/favorites`));
  const progress = await getDocs(collection(db, `${base}/readingProgress`));
  // Audio checkpoints can exist under absent slideshow documents; inspect every catalogue ID
  // represented by audio-only progress using a dedicated parent marker in new child saves.
  const references = [...favorites.docs.map(item => item.ref)];
  for (const item of progress.docs) {
    const audio = await getDocs(collection(item.ref, 'audioProgress'));
    references.push(...audio.docs.map(entry => entry.ref), item.ref);
  }
  for (let offset = 0; offset < references.length; offset += 400) {
    const batch = writeBatch(db);
    references.slice(offset, offset + 400).forEach(item => batch.delete(item));
    await batch.commit();
  }
  const batch = writeBatch(db);
  batch.delete(reference);
  await batch.commit();
};

/** Updates schedule or one exclusion transactionally, preserving concurrent policy edits. */
export const updateChildPolicy = async (
  uid: string,
  id: string,
  change:
    | { schedule: Omit<ChildPolicy, 'excludedStories'> }
    | { storyId: string; available: boolean },
): Promise<void> => {
  const reference = doc(db, profilePath(uid, id));
  await runTransaction(db, async transaction => {
    const snapshot = await transaction.get(reference);
    if (!snapshot.exists() || snapshot.data().deleting)
      throw new Error('Profile unavailable');
    const previous = normalizeChildPolicy(snapshot.data().policy);
    const next =
      'schedule' in change
        ? { ...previous, ...change.schedule }
        : {
            ...previous,
            excludedStories: change.available
              ? previous.excludedStories.filter(item => item !== change.storyId)
              : [...new Set([...previous.excludedStories, change.storyId])],
          };
    transaction.update(reference, { policy: normalizeChildPolicy(next) });
  });
};
