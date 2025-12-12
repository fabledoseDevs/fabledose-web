import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierPlugin from 'eslint-plugin-prettier';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import globals from 'globals';

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'docs/**', 'out/**', 'build/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.{js,cjs,mjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
      tsdoc: tsdocPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,

      'prettier/prettier': ['error', { singleQuote: true }, { usePrettierrc: true }],

      'react/react-in-jsx-scope': 'off',

      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'max-lines': ['warn', 500],

      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

      'react/destructuring-assignment': ['error', 'always'],
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      'react/jsx-first-prop-new-line': [2, 'multiline'],
      'react/no-array-index-key': 'off',
      'react/self-closing-comp': 'error',

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',

      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/no-noninteractive-tabindex': 'off',

      'react-hooks/exhaustive-deps': 'off',
      'no-useless-escape': 'off',
      'react/display-name': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'react/prop-types': 'off',

      '@typescript-eslint/ban-types': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/jsx-no-target-blank': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      'no-case-declarations': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],

      'tsdoc/syntax': 'warn',
    },
  },

  {
    files: ['src/**/*.tsx'],
    rules: {
      'max-lines': ['error', 700],
    },
  },
  {
    files: ['src/**/*.{js,cjs,mjs}'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['src/**/*.types.ts'],
    rules: {
      'max-lines': 'off',
      'tsdoc/syntax': 'off',
    },
  },
];