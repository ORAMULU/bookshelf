import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import {
  defineConfig,
  globalIgnores
} from 'eslint/config'

export default defineConfig([
  reactHooks.configs.flat.recommended,
  {
    plugins: {
      'react-compiler': require('eslint-plugin-react-compiler')
    },
    rules: {
      'react-compiler/react-compiler': 'error' // or 'warn' during migration
    }
  },
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]'
      }],
    },
  },
])