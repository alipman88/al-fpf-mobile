import { AppRegistry } from 'react-native'

import { App } from './src/App'

// Configure rollbar
import '@fpf/common/utils/rollbar'

AppRegistry.registerComponent('FrontPorchForum', () => App)
