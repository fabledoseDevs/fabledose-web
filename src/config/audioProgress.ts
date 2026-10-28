import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';

import type { FableLocale } from '@/fables/fables.types';

import type { AudioProgressData } from './audioProgress.types';
import { db } from './firebase';
import { profilePath } from './profileScope';
import { createWriteQueue } from './writeQueue';

const queue = createWriteQueue();
const versions = new Map<string, number>();
const keyFor = (
  uid: string,
  id: string,
  locale: FableLocale,
  profileId?: string | null,
): string => `${profilePath(uid, profileId)}/${id}/${locale}`;
const reference = (
  uid: string,
  id: string,
  locale: FableLocale,
  profileId?: string | null,
) =>
  doc(
    db,
    `${profilePath(
      uid,
      profileId,
    )}/readingProgress/${id}/audioProgress/${locale}`,
  );

export const isValidAudioProgress = (
  value: unknown,
): value is AudioProgressData => {
  if (!value || typeof value !== 'object') return false;
  const data = value as AudioProgressData;
  return (
    typeof data.fableId === 'string' &&
    !!data.fableId &&
    (data.locale === 'pl' || data.locale === 'en') &&
    typeof data.source === 'string' &&
    !!data.source &&
    Number.isFinite(data.positionSeconds) &&
    data.positionSeconds >= 0 &&
    Number.isFinite(data.durationSeconds) &&
    data.durationSeconds > 0 &&
    data.positionSeconds <= data.durationSeconds &&
    typeof data.isCompleted === 'boolean' &&
    Number.isFinite(data.lastUpdated)
  );
};

export const saveAudioProgress = (
  uid: string,
  data: AudioProgressData,
  profileId?: string | null,
): Promise<void> => {
  if (!isValidAudioProgress(data))
    return Promise.reject(new Error('Invalid audio position'));
  const key = keyFor(uid, data.fableId, data.locale, profileId);
  versions.set(key, (versions.get(key) || 0) + 1);
  return queue(key, () => {
    if (!profileId)
      return setDoc(reference(uid, data.fableId, data.locale), data);
    const batch = writeBatch(db);
    batch.set(
      doc(db, `${profilePath(uid, profileId)}/readingProgress/${data.fableId}`),
      { fableId: data.fableId },
      { merge: true },
    );
    batch.set(reference(uid, data.fableId, data.locale, profileId), data);
    return batch.commit();
  });
};

export const getAudioProgress = async (
  uid: string,
  id: string,
  locale: FableLocale,
  source: string,
  profileId?: string | null,
): Promise<AudioProgressData | null> => {
  const key = keyFor(uid, id, locale, profileId);
  while (true) {
    await queue.waitFor(key);
    const version = versions.get(key);
    const snapshot = await getDoc(reference(uid, id, locale, profileId));
    await queue.waitFor(key);
    if (versions.get(key) !== version) continue;
    const data: unknown = snapshot.exists() ? snapshot.data() : null;
    return isValidAudioProgress(data) &&
      data.fableId === id &&
      data.locale === locale &&
      data.source === source
      ? data
      : null;
  }
};
