import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { region } from 'firebase-functions/v1';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

import { cleanDeletedAccount, createDeleteAccountHandler } from './accountDeletion.js';

initializeApp();
const db = getFirestore();
const lockUser = uid => db.doc(`accountDeletionLocks/${uid}`).set({ requestedAt: FieldValue.serverTimestamp() }, { merge: true });

/** Deletes only the freshly reauthenticated caller; Auth deletion enqueues data cleanup. */
export const deleteAccount = onCall({ region: 'europe-west1', timeoutSeconds: 60 }, createDeleteAccountHandler({
  removeUser: uid => getAuth().deleteUser(uid),
  lockUser,
  error: (code, message) => new HttpsError(code, message),
}));

/** Auth triggers currently use the first-generation API; retries preserve failed cleanup work. */
export const cleanDeletedAccountData = region('europe-west1').runWith({ failurePolicy: true, timeoutSeconds: 540 }).auth.user().onDelete(user => cleanDeletedAccount(user.uid, {
  lockUser,
  removeData: uid => db.recursiveDelete(db.doc(`users/${uid}`)),
}));
