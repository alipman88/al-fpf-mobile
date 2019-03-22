import { AppRegistry } from 'react-native'
import { Buffer } from 'buffer'
import { URL, URLSearchParams } from 'whatwg-url'

import { App } from './src/App'

// these need to be global in order to work
global.Buffer = Buffer
global.URL = URL
global.URLSearchParams = URLSearchParams

AppRegistry.registerComponent('FrontPorchForum', () => App)
