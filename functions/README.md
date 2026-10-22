# Account management in Firebase

The frontend uses Firebase Auth for verified email changes and password changes.
`deleteAccount` is a callable Cloud Function, not a Next.js API route. It accepts
only explicit confirmation; the UID is taken from the verified caller token and
`auth_time` must be no older than five minutes. No admin credentials reach the app.

`cleanDeletedAccountData` is a retry-enabled Auth deletion trigger. It recursively
deletes `users/{uid}`, including favorites, reading progress and future nested
collections. Cleanup is asynchronous after Auth deletion. It also covers accounts
deleted from the Firebase console. A failed cleanup throws so Firebase retries it;
monitor failed invocations in Cloud Logging and alert on exhausted retries.

## Deletion locks and Firestore rules — required before enabling deletion

`accountDeletionLocks/{uid}` is an Admin-only technical tombstone. It stores a
server timestamp under the removed UID, with no email, password or profile data.
Retain this lock to stop still-valid tokens and in-flight clients from recreating
the removed user's documents. Application data under `users/{uid}` is erased.

A complete copy-and-paste version is saved in
[`firestore-account-deletion.rules`](../docs/firebase/firestore-account-deletion.rules).
It is based on the rules supplied for `fabledose-3413d` on 22 October 2026
(the console version dated 20 August 2026), not fetched from the live project.

**Publication is deferred during Spark testing.** When account deletion is being
enabled, open Firebase Console → Firestore Database → Rules, replace the entire
editor contents with that file, then publish. Do not paste it alongside another
complete rules document. If the deployed rules have changed since the supplied
version, reconcile those changes first so other features keep their access.

The rules file is intentionally not connected to `firebase.json`; deploying the
Functions codebase does not publish it automatically.

Firestore allows an operation if ANY matching rule permits it: audit overlapping
wildcard rules as well. Admin SDK operations bypass these client rules. The lock
is retained if Auth deletion fails: retry the deletion callable after fixing the
service error. Unlock manually only after confirming Auth deletion never happened.

## Local checks

Use Node 22 for the Functions package (the web app keeps its existing runtime).

```sh
npm ci --prefix functions
npm run test:account
```

Unit tests use injected dependencies and do not delete real accounts. Frontend
Google popup flows and verification emails require a controlled test account.

## Deployment

Use the SAME Firebase project as the web app. Cloud Functions require a project
with billing enabled and an authenticated Firebase CLI with deploy permissions.
The region is `europe-west1` in both the callable and the client. The Auth deletion
trigger uses the v1 API; the callable uses v2. Deploy both together.

1. Review and publish the complete rules file linked above, incorporating any newer deployed-rule changes.
2. Install dependencies with Node 22: `npm ci --prefix functions`.
3. Run local checks: `npm run test:account`.
4. Deploy only this codebase, specifying the real project explicitly:

```sh
firebase deploy --project YOUR_PROJECT_ID --only functions:account-management
```

5. After confirming both functions and the lock rules are deployed, set
   `NEXT_PUBLIC_ACCOUNT_DELETION_ENABLED=true` in the web app environment and
   rebuild/restart the web app. Deletion remains disabled by default and does not
   attempt Firebase reauthentication when disabled. The flag is a rollout switch, not authorization.

No deployment or changes to remote rules are performed by the local tests. No
Firebase project alias or service-account key is committed. Before Functions are
deployed, the client displays an unavailable-service error and does not sign out
or claim the account was deleted.

These functions currently remove Firestore application data. If user uploads,
payments or other services are introduced, extend the cleanup before enabling them.

## Important notice — deferred during Spark testing

These functions are prepared but deployment is intentionally deferred. The project
stays on Spark while the remaining application features are tested. Do not enable
Blaze or follow the deployment steps above yet. Keep
`NEXT_PUBLIC_ACCOUNT_DELETION_ENABLED` unset or `false`; the delete button remains
disabled. Resume this deployment only when account deletion is scheduled for release.
