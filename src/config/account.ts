import { FirebaseError } from 'firebase/app';
import {
  type User,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  signOut,
  updatePassword,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { auth } from './firebase';

/** Deferred during Spark testing. Enable only after Functions and lock rules are deployed. */
export const ACCOUNT_DELETION_ENABLED =
  process.env.NEXT_PUBLIC_ACCOUNT_DELETION_ENABLED === 'true';

/** Rejects stale operations when the signed-in account changes during a request. */
export const assertCurrentAccount = (user: User): void => {
  if (auth.currentUser?.uid !== user.uid)
    throw new FirebaseError('auth/user-mismatch', 'Account changed.');
};

/** Confirms sensitive operations with the existing password or the linked Google identity. */
export const reauthenticateAccount = async (
  user: User,
  password: string,
): Promise<void> => {
  assertCurrentAccount(user);
  if (user.providerData.some(provider => provider.providerId === 'password')) {
    if (!password || !user.email)
      throw new FirebaseError('auth/missing-password', 'Password is required.');
    await reauthenticateWithCredential(
      user,
      EmailAuthProvider.credential(user.email, password),
    );
  } else if (
    user.providerData.some(provider => provider.providerId === 'google.com')
  ) {
    await reauthenticateWithPopup(user, new GoogleAuthProvider());
  } else
    throw new FirebaseError(
      'auth/operation-not-allowed',
      'Unsupported sign-in provider.',
    );
  assertCurrentAccount(user);
};

/** Sends verification without replacing the confirmed email in local or persisted settings. */
export const requestEmailChange = async (
  user: User,
  email: string,
  password: string,
): Promise<void> => {
  await reauthenticateAccount(user, password);
  await verifyBeforeUpdateEmail(user, email.trim());
  assertCurrentAccount(user);
};

/** Updates Firebase Auth only. Passwords and their lengths are never written to settings. */
export const changeAccountPassword = async (
  user: User,
  password: string,
  nextPassword: string,
): Promise<void> => {
  await reauthenticateAccount(user, password);
  await updatePassword(user, nextPassword);
  assertCurrentAccount(user);
};

/** Reauthenticates before invoking Firebase; client logout happens only after confirmed deletion. */
export const deleteAccountWithFirebase = async (
  user: User,
  password: string,
): Promise<void> => {
  if (!ACCOUNT_DELETION_ENABLED) {
    throw new FirebaseError(
      'functions/unavailable',
      'Account deletion is not enabled.',
    );
  }
  await reauthenticateAccount(user, password);
  await user.getIdToken(true);
  assertCurrentAccount(user);
  const remove = httpsCallable<{ confirm: boolean }, { deleted: boolean }>(
    getFunctions(auth.app, 'europe-west1'),
    'deleteAccount',
  );
  const result = await remove({ confirm: true });
  if (result.data.deleted !== true)
    throw new Error('Deletion was not confirmed.');
  // Do not sign out a different account if the active session changed while awaiting the backend.
  if (auth.currentUser?.uid === user.uid) await signOut(auth);
};
