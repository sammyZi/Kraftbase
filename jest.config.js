/**
 * Jest configuration for the Expo (managed workflow) + TypeScript app.
 *
 * Uses the `jest-expo` preset so React Native / Expo modules are transformed
 * correctly. `transformIgnorePatterns` is widened to allow Babel to transpile
 * the Expo, React Native, and React Navigation packages that ship untranspiled
 * ESM/Flow source.
 */
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))',
  ],
};
