import { AppRegistry, LogBox } from 'react-native'

// Prevent potential crash by importing gesture handler
// https://github.com/kmagiera/react-native-gesture-handler/issues/746#issuecomment-537562738
import 'react-native-gesture-handler'

import { App } from './src/App'

// Configure rollbar
import '@common/utils/rollbar'

// Ignore warnings from third party libraries
// LATER: remove this when these libraries have been fixed
LogBox.ignoreLogs([
  'componentWillMount',
  'componentWillUpdate',
  'componentWillReceiveProps',
  // Silence many warnings about styles missing units
  // https://github.com/styled-components/css-to-react-native/issues/40
  'Expected style',
])

AppRegistry.registerComponent('FrontPorchForum', () => App)
