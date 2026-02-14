import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      '@stylistic': stylistic,
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // React rules
      'react/no-unknown-property': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Stylistic rules
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/jsx-tag-spacing': ['error', { beforeClosing: 'never' }],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
      '@stylistic/jsx-curly-newline': ['error', 'consistent'],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'parens',
        logical: 'parens',
        prop: 'parens',
      }],

      // Common rules
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_',
      }],
      'no-undef': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['rollbar.config.js', 'vite.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
];
