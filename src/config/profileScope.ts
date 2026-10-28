/** Validates path segments before composing Firestore profile paths. */
export const profilePath = (uid: string, profileId?: string | null): string => {
  if (
    !uid ||
    uid.includes('/') ||
    (profileId != null && (!profileId || profileId.includes('/')))
  )
    throw new Error('Invalid library owner');
  return profileId ? `users/${uid}/childProfiles/${profileId}` : `users/${uid}`;
};

/** Stable cache/queue identity, including the parent fallback. */
export const profileKey = (uid: string, profileId?: string | null): string =>
  profilePath(uid, profileId);
