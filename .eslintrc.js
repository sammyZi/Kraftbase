/**
 * Base ESLint configuration.
 *
 * Enforces the project's consistent-styling rules (Requirement 8): the
 * `react-native/no-inline-styles` rule flags inline style object literals so
 * all styling flows through `StyleSheet` factories that consume design tokens.
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: {
    es2021: true,
    'react-native/react-native': true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // Consistent styling: no inline style object literals (Requirement 8.2).
    'react-native/no-inline-styles': 'error',
    // The new JSX transform does not require React in scope.
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['node_modules/', '.expo/', 'dist/', 'web-build/', 'babel.config.js'],
};
