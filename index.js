import { AppRegistry } from 'react-native'

import { App } from './src/App'
import { bgMessaging } from './bgMessaging'

// Configure rollbar
import '@common/utils/rollbar'

AppRegistry.registerComponent('FrontPorchForum', () => App)
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging
)
