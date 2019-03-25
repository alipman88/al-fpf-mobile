import { AppRegistry } from 'react-native'

import { App } from './src/App'
import { bgMessaging } from './bgMessaging'

AppRegistry.registerComponent('FrontPorchForum', () => App)
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging
)
