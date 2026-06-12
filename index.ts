// IMPORTANT: must be the first import so gesture handler is initialized before
// any navigation/gesture code runs. Fixes stuck/unresponsive touch + scroll.
import 'react-native-gesture-handler';

import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App)
// and ensures the environment is set up appropriately for both Expo Go and native builds.
registerRootComponent(App);
