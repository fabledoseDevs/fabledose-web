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
