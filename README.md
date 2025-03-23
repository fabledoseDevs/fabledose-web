![Node.js version](https://img.shields.io/badge/node-20.11.0-brightgreen)&nbsp;
![Next.js](https://img.shields.io/badge/next.js-15.2.3-blue)&nbsp;
![License](https://img.shields.io/badge/react-19.x-orange)

<img src="public/fabledose - logo-green.svg" alt="Fabledose Logo" width="300" />

Welcome to the Fabledose project! This application showcases a library of animated books designed to engage children in reading.

You’re invited to explore the demo and see the MVP in action:

[🌐 Live Demo → fabledose.com](https://fabledose.com)

### Prerequisites
Ensure you have the following installed on your machine:
* Node.js: v20.11.0 (recommended to use [NVM](https://github.com/nvm-sh/nvm))
* Next.js: v15.2.3
* React: v19.x

### Node Version Management
To manage the Node.js version, use [NVM](https://github.com/nvm-sh/nvm). Run the following command in the root of the project to install the correct Node.js version as specified in the `.nvmrc` file:
```
nvm install
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

### Other commands
1. Build the application
```
npm run build
```
2. Start in production mode
```
npm start
```

### Folder structure
<style>
  .readme-textarea {
    width: 100%;
    max-width: 440px;
    height: 800px;
    background-color: #3d3d3d;
    color: #d3d3d3;
    padding: 1rem;
    font-family: Ubuntu, monospace, sans-serif;
    line-height: 1.5;
    border: 0;
    border-radius: 4px;
    resize: vertical;
    overflow: auto;
  }
</style>
<details>
<summary>CLICK TO EXPAND</summary>
<textarea class="readme-textarea" readonly>/fabledose-web
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
│	│	│	└──	/…
│	│	│
│	│	├── /molecules
│	│	│	└──	/…
│	│	│
│	│	├── /organisms
│	│	│	└──	/…
│	│	│
│	│	└──/templates
│	│		└──	/…
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
│	│	├── GlobalStyles.ts
│	│	├── theme.ts
│	│	└── types.ts
│	│
│	├── /types		# TypeScript type definitions
│	└── /context		# React Context providers
│		├── /app
│		└──  /user
│
├── .env 		# Environment variables
├── .eslintrc.js 		# ESLint configuration
├── next.config.js		# Next.js configuration
├── package.json		# Project dependencies
└── tsconfig.json		# TypeScript configuration
</textarea>

</details>

### License
This project is licensed under the MIT License.

### Tech Stack
- Next.js 15
- React 19
- TypeScript
- Styled-components
- Contentful (CMS)

### Feedback and Contributions
We welcome your feedback and contributions! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.****