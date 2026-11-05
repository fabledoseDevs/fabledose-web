<img src="public/logo-green.svg" alt="Fabledose Logo" width="300" />

Welcome to the Fabledose project! This application showcases a library of animated books designed to engage children in reading.

You’re invited to explore the demo and see the MVP in action:

[🌐 Live Demo → fabledose.com](https://fabledose.com)

### Node Version Management
To manage the Node.js version, use [NVM](https://github.com/nvm-sh/nvm). Run the following command in the root of the project to install the correct Node.js version as specified in the `.nvmrc` file:
```
nvm install
```

To run correct Node.js version, use the following command:
```
nvm use 20
```

### Setting Up the Environment
You need to create an `.env` file in the root directory and populate it with the necessary environment variables:
```
LOCALE=              # Default language/region (e.g., "en-US")
APP_ENVIRONMENT=     # "development", "production", etc.
SPACE_ID=            # Contentful space ID
PREVIEW_TOKEN=       # Contentful preview API token
DELIVERY_TOKEN=      # Contentful delivery API token
```

### Getting Started
Follow these steps to run the development server:

1. Install the dependencies:
```
npm install
```
2. Start the development server:
```
npm run dev
```
3. Open http://localhost:3000 in your browser to see the application in action.

### Other Commands
1. Build the application
```
npm run build
```
2. Start in production mode
```
npm start
```

### Documentation
The project uses TypeDoc to generate documentation from TypeScript source code. The documentation primarily covers
component types, interfaces, and their usage.

1. Generate documentation:
```
typedoc
```
2. Generate documentation and open them in browser
```
docs:serve
```
3. Watches for changes and rebuilds automatically
```
docs:watch
```


### Folder Structure
The project follows a modular structure to keep the codebase organized and maintainable. The main directories are as follows:
<details>
<summary>Click to expand</summary>

```text
/fabledose-web
├── /public		# Static assets
├── /src		# Application source code
│	├── /app		# App Router
│	│	├── page.tsx
│	│	├── layout.tsx
│	│	├── /[other-page]
│	│	│	├── layout.tsx
│	│	│	├── page.tsx
│	│	│	└── /…
│	│	└── /…
│	│
│	├── /components		# Shared components
│	│	├── /atoms
│	│	│	├──/[component]
│	│	│	│	├── index.ts
│	│	│	│	├── component.tsx
│	│	│	│	├── component.hook.ts
│	│	│	│	├── component.styled.ts
│	│	│	│	└── component.types.ts
│	│	│	└── /…
│	│	│
│	│	├── /molecules
│	│	│	└── /…
│	│	│
│	│	├── /organisms
│	│	│	└── /…
│	│	│
│	│	└──/templates
│	│		└── /…
│	│	
│	├── /lib		# Utility functions
│	│	├── /api
│	│	│	├── /adapters
│	│	│	├── /graphql
│	│	│	└── /thirdparty
│	│	│
│	│	├── /mappers		# Query mappers
│	│	├── /helpers		# Helper functions
│	│	└── /constants		# Constant values
│	│
│	├── /hooks		# Custom React hooks
│	├── /styles		# Global styles and theme
│	│	├── GlobalStyle.tsx
│	│	├── theme.ts
│	│	└── types.ts
│	│
│	├── /types		# TypeScript type definitions
│	└── /context		# React Context providers
│		├── /app
│		└── /user
│
├── .env 		# Environment variables
├── .eslintrc.js 		# ESLint configuration
├── next.config.js		# Next.js configuration
├── package.json		# Project dependencies
└── tsconfig.json		# TypeScript configuration
```
</details>

### License
This project is licensed under the MIT License.

### Tech Stack
- Next.js 15
- React 19
- TypeScript

### Feedback and Contributions
We welcome your feedback and contributions! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Audiobook progress

Audiobook favorites use the same saved favorites as the story introduction. Listening position is independent of slide progress and is stored per account, story and recording language:

```text
users/{uid}/readingProgress/{fableId}/audioProgress/{pl|en}
```

The checkpoint contains the recording URL, position and duration in seconds, completion state and timestamp. A changed URL does not reuse the previous recording's position. Finished recordings start at zero on the next visit. Loading a checkpoint does not start playback automatically.

Progress is submitted every 15 seconds while dirty and on pause, seek, completion, player close, hidden tabs and navigation cleanup. Page shutdown submission is best effort; the browser may terminate pending network work. Save failures offer a retry of the newest position without blocking the controls. Ordinary saving feedback is delayed by 5 seconds. Failed reads require retry before restoring playback. Labels and feedback support Polish and English. Missing language-specific audio is reported instead of silently using a different language.

The existing recursive owner rule `match /readingProgress/{document=**}` covers these nested documents. No new Firestore collection rule, Cloud Function or Firebase billing upgrade is required when this documented rule is deployed. A narrower rule without the recursive wildcard would need adjustment. Listening entries do not create parent slide-progress records and do not appear in the Continue Reading query.

Run `npm run test:audio` for playback and persistence regressions. Browser checks use a separate test copy with mocked Firebase and a real MP3; they do not verify deployed Firebase rules or account access.

## Story details for parents

The More info button opens the shared modal from story introductions and library carousel cards. The dialog shows localized tag explanations, parent notes and a full spoiler-inclusive synopsis, including the ending. Edit `meta.fullDescription.pl` and `.en` in `public/fable-database/index.json`; blank lines in the synopsis separate paragraphs. Content should describe this adaptation, not another version of the traditional tale.

The modal has a single scrollable content area, persistent title and close controls, keyboard focus containment and focus restoration to the opener. `TagIcon` supports `showDescription` for always-visible explanations on a light background. Existing compact tags retain their tooltip behavior.

## Important notice — account deletion deferred

The application is currently being tested on Firebase **Spark**. Deployment of account-deletion Cloud Functions is intentionally postponed; do not upgrade to Blaze or deploy these functions as part of the current test phase. Email changes, password changes and password recovery can still be tested independently.

The deletion implementation is retained for later activation. The delete button is disabled and the frontend does not invoke the deletion backend while `NEXT_PUBLIC_ACCOUNT_DELETION_ENABLED` is absent or not set to `true`. Keep this flag disabled in every test environment for now.

When account deletion is scheduled for release:

1. Deliberately enable Firebase billing (Blaze) for Cloud Functions deployment.
2. Review and publish the complete [copy-and-paste Firestore rules](docs/firebase/firestore-account-deletion.rules), preserving any newer changes to the deployed rules.
3. Deploy both `deleteAccount` and `cleanDeletedAccountData`.
4. Verify the complete flow with a disposable test account, including data cleanup.
5. Set `NEXT_PUBLIC_ACCOUNT_DELETION_ENABLED=true` and rebuild/restart the frontend.

Deployment details: [Firebase Functions instructions](functions/README.md).


### Child profiles (Spark)

Profiles are real Firestore documents at `users/{uid}/childProfiles/{profileId}`.
Names/pseudonyms, one of twelve bundled avatars and an optional age group can be
created and edited in Settings → Parental control. The profile picker in the
navigation switches between children and the parent library. Selection is local
to the current device and stored separately for each Firebase account.

Favourites, reading progress and PL/EN audiobook checkpoints are isolated under
the selected child document. The parent retains all existing library data;
profiles previously shown as examples were never persisted and are not migrated.
Deleting a child requires confirmation and removes only that child's data.
Interrupted deletion leaves a tombstone and can be retried from the profile list.
Audio-only child checkpoints also create a discoverable parent marker for cleanup;
this marker is not shown as slideshow progress.

**Important notice:** publish the complete updated rules from
[`docs/firebase/firestore-account-deletion.rules`](docs/firebase/firestore-account-deletion.rules)
before testing profiles against Firebase. See the [step-by-step guide](docs/firebase/child-profiles.md).
No production rules, billing settings or Cloud Functions are deployed by this change.
Story exclusions and weekday/weekend access windows now work as Spark preferences.
In parent mode, the arrow beside the favourite button opens one availability switch
per child. Excluded stories disappear from library, catalogue/search and favourites;
direct story routes are also blocked. Hours are stored per child in an IANA timezone,
with an inclusive start and exclusive end. Equal/overnight windows are rejected.
The application stops reading/audio outside the window and preserves progress.

**Parent PIN is not enabled.** Switching profiles and editing preferences are not
protected by a server-verified parent session. These are application-level limits:
the browser clock can be changed and public media assets remain accessible directly.
Secure parent authorization and media delivery require a separate backend design;
no PIN is stored in Firestore or browser storage. Plan-specific profile limits are applied; no automatic parent-library migration is introduced. Profiles and policy changes require the **latest**
copy of the rules linked above, including the new optional `policy` field.

Validation: `npm run test:profiles`, `npm run test:library`, `npm run test:audio`.


## Plan access — initial Spark implementation

| Feature | Free | Family | Ultimate |
| --- | --- | --- | --- |
| Animated stories and audiobooks | Selection (currently all four stories) | Full library, including seasonal stories | Full library, including seasonal stories |
| Animation quality | AUTO / SD | AUTO / SD / HD | AUTO / SD / HD / 2K (currently HD assets) |
| PDF / EPUB | Unavailable | Included when files exist | Included when files exist |
| Child profiles / parental preferences | Disabled; parent account only | Up to 6 | Unlimited |
| Existing licence description | Private family viewing | Private family viewing | Private and public screenings |

`src/config/plans.ts` centralizes these permissions. Catalogue `meta.availability`
accepts `selection`, `subscription` or `seasonal`; omitted values retain selection
access for legacy content. Every current story explicitly belongs to selection.
Story cards and direct reader/audio routes apply the same catalogue permission.
All plans include animation and the audiobook player. AUTO respects the plan ceiling: Free uses 720p, paid plans use 720p on compact viewports and 1080p on larger screens. Explicit SD/HD settings select actual 720p/1080p assets. Ultimate 2K currently resolves to HD until QHD files are supplied. Legacy high maps to HD; removed 4K maps to AUTO. Quality changes remount the video source so the browser loads the new asset immediately, without resetting the selected slide.

Unavailable plan actions use the shared modal and a locale-aware “See all plans”
button. Missing PDF/EPUB files are explained separately for paid accounts; no fake
`#` download link or suggestion to upgrade again is shown. Ebook assets still need
to be supplied and linked via the story card's `pdfUrl` / `epubUrl`.

Profile creation checks the stored account plan in a Firestore transaction and
serializes creators through the parent document's `childProfileRevision`. Family
creation counts all existing profiles, including unfinished deletions, before
allowing another. After downgrading to Family only the first six profiles (creation
time / ID order) can be selected; extra records remain stored and selecting one
opens the upgrade dialog. Free selects the parent library and disables profile
management and parental preferences. Upgrading restores access without data loss.

**Publish the updated complete Firestore rules again** before testing: child
profile creation/updates and child-library writes now require the stored Family
or Ultimate plan. Existing ownership/deletion-lock conditions remain in place.
No rule deployment, Functions, Blaze or payment integration is performed here.

**Important notice:** configured plans are still part of the existing test account
settings workflow. This change is not verified payment entitlement enforcement:
server-issued subscription authority and protected media delivery remain future
backend work. The Family count is enforced by application transactions; the rules
check paid-plan access but do not independently count collection documents. PIN
verification is still deferred. Existing account data is not migrated or removed.

Run `npm run test:plans`, `npm run test:profiles`, `npm run test:library` and
`npm run test:audio`. Browser checks use mocked Firebase, including downgrade and
quota cases; they do not validate deployed production rules.


### Protected ebook downloads (Goldilocks, PL/EN)

PDF and EPUB files are stored as AES-256-GCM encrypted `.enc` files in
`private/ebooks/`, **outside `public/`**. This repository is public: never commit
plaintext ebooks or the encryption key. The route decrypts only after authorization. The existing
story-intro buttons fetch `/api/ebooks/{id}/{locale}/{format}` with the signed-in
Firebase ID token in the Authorization header. Every request validates that token
with Firebase Auth and reads the owner's current `settings.plan` via Firestore REST.
Only `family` and `ultimate` are allowed; browser state and URL parameters cannot
supply a plan. No access tokens appear in URLs and responses are never cached.
Next.js bundles the four encrypted files using `outputFileTracingIncludes`.
`EBOOK_ENCRYPTION_KEY` is a 64-character hexadecimal (32-byte) server-only key;
it is stored locally in ignored `.env.local` and must also be set in the Vercel
environment. Never prefix it with `NEXT_PUBLIC_`, log it, or include it in a PR.
Retain the key in a secure backup; changing it requires re-encrypting all assets.
This uses the existing Next.js deployment and Firebase services, not Cloud
Functions or Firebase Storage. It does not require enabling Blaze.

**Required rollout order — downloads are disabled until completed:**

1. In Firebase Console → Firestore Database → Rules, replace the entire rules text
   with `docs/firebase/firestore-account-deletion.rules` and publish. This keeps
   existing profile policies. During the current test phase, `testPlansEnabled()`
   is true: all signed-in users can freely switch Free/Family/Ultimate without
   payments. Downloads still check the CURRENT saved plan on every request.
   Reconcile any newer console-only changes before replacing the file.
2. Sign in and use Settings → Profile and account → plan selection to switch
   freely between Free, Family and Ultimate. The interface waits for the saved
   plan before updating permissions. No payment is taken.
3. Copy `EBOOK_ENCRYPTION_KEY` from local `.env.local` to Vercel → project →
   Settings → Environment Variables, for each environment serving ebooks.
   Set server-only `EBOOK_DOWNLOADS_ENABLED=true` in the deployment environment
   (and `.env.local` for local testing), then redeploy/restart Next.js. Leave it
   unset until the rules above have been published. Existing
   `NEXT_PUBLIC_FIREBASE_API_KEY` and `NEXT_PUBLIC_FIREBASE_PROJECT_ID` must match
   that Firebase project; no Admin private key is needed.
4. Test both languages/formats in Family and Ultimate. Test Free, logout and
   a pasted API URL: no file must be returned. Test a downgraded plan again;
   the server reads its current value on every request.

The gate is an operational rollout switch, not authorization. Before enabling billing, set `testPlansEnabled()` to false in the rules and
assign plans from trusted server code. The current test switch deliberately lets
any logged-in tester enable paid-plan features without paying. A downloaded file can be copied by its
recipient; this access check is not DRM. Do not move ebooks into `public/`, issue
public storage tokens, or add a static-file fallback when authentication fails.

Checks: `npm run test:ebooks`, `npm run test:plans`, `npm run types-check`,
`npm run lint`, `npm run build`. Automated tests mock Firebase and never touch
live accounts or publish rules.


### Maintenance preview during testing

The public homepage announces Q1 2027 and no longer links to a demo. The discreet
bottom-left trigger opens a password dialog. Shared password: `TestAccess`.
A successful server check sets an HttpOnly, SameSite=Lax cookie for 48 hours
(Secure on HTTPS); the server verifies its signature and expiry on refresh.
Signing uses the existing server-only `EBOOK_ENCRYPTION_KEY`; no additional
Vercel variable is required. This is a shared preview convenience, not account
authentication or a security boundary for the rest of the application.
