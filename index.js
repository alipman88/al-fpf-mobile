import { AppRegistry, YellowBox } from 'react-native'

// Prevent potential crash by importing gesture handler
// https://github.com/kmagiera/react-native-gesture-handler/issues/746#issuecomment-537562738
import 'react-native-gesture-handler'

import { App } from './src/App'

// Configure rollbar
import '@common/utils/rollbar'

// Ignore warnings from third party libraries
// LATER: remove this when these libraries have been fixed
YellowBox.ignoreWarnings([
  'componentWillMount',
  'componentWillUpdate',
  'componentWillReceiveProps',
  'DatePickerIOS', // https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/262
  'RCTRootView cancelTouches' // https://github.com/kmagiera/react-native-gesture-handler/issues/746
])

AppRegistry.registerComponent('FrontPorchForum', () => App)
