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
```dotenv
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
│	│	├── GlobalStyle.ts
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