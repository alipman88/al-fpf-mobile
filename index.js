import { AppRegistry } from 'react-native'

import { App } from './src/App'

// Configure rollbar
import '@common/utils/rollbar'

AppRegistry.registerComponent('FrontPorchForum', () => App)
