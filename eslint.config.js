import { defineConfig } from 'eslint/config'
import js from '@eslint/js'

import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default defineConfig([
  // Ignore common folders globally
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },

  // Ignore cypress.config.ts and vite.config.ts from general TS config
  {
    ignores: ['cypress.config.ts', 'vite.config.ts'],
  },

  // JavaScript files
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
  },

  // TypeScript files WITH project (type-aware linting)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Special TS files WITHOUT project (no type-aware linting)
  {
    files: ['cypress.config.ts', 'vite.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Vue files
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      ...vuePlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
    },
  },
])
