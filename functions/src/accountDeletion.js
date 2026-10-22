/**
 * Builds the authenticated deletion callable independently of the Firebase runtime.
 * The target always comes from the verified token, never from client-supplied UIDs.
 * @param {{removeUser: (uid: string) => Promise<void>, lockUser: (uid: string) => Promise<void>, error: (code: string, message: string) => Error, now?: () => number}} dependencies
 * @returns {(request: {auth?: {uid: string, token: {auth_time?: number}}, data?: {confirm?: boolean}}) => Promise<{deleted: boolean}>}
 */
export const createDeleteAccountHandler = ({ removeUser, lockUser, error, now = Date.now }) => async request => {
  if (!request.auth?.uid) throw error('unauthenticated', 'Sign in first.');
  const authenticatedAt = request.auth.token.auth_time;
  const age = now() / 1000 - authenticatedAt;
  if (!Number.isFinite(authenticatedAt) || age < -30 || age > 300) {
    throw error('failed-precondition', 'Reauthentication is required.');
  }
  if (request.data?.confirm !== true) throw error('invalid-argument', 'Explicit confirmation is required.');
  const uid = request.auth.uid;
  await lockUser(uid);
  try {
    await removeUser(uid);
  } catch (cause) {
    if (cause?.code !== 'auth/user-not-found') throw error('aborted', 'Account deletion was not completed. Retry the operation.');
  }
  return { deleted: true };
};

/**
 * Cleans the complete user subtree after Auth deletion, including future subcollections.
 * The durable lock prevents late clients from recreating erased data when enforced in rules.
 * Throwing allows the Auth trigger's retry policy to resume after transient Firestore failures.
 * @param {string} uid - UID from the trusted Auth deletion event.
 * @param {{lockUser: (uid: string) => Promise<void>, removeData: (uid: string) => Promise<void>}} dependencies
 * @returns {Promise<void>}
 */
export const cleanDeletedAccount = async (uid, { lockUser, removeData }) => {
  await lockUser(uid);
  await removeData(uid);
};
