import { Client } from 'rollbar-react-native'
import DeviceInfo from 'react-native-device-info'

import { Config } from '@common/config'

let rollbar

try {
  const version = DeviceInfo.getBuildNumber()

  rollbar = new Client({
    accessToken: Config.ROLLBAR_API_KEY,
    enabled: !['development', 'test'].includes(Config.ENVIRONMENT),
    environment: Config.ENVIRONMENT,
    appVersion: version,
    captureUncaught: true,
    payload: {
      client: {
        javascript: {
          // https://docs.rollbar.com/docs/react-native#section-source-maps
          source_map_enabled: true,
          code_version: version,
          environment: Config.ENVIRONMENT,
        },
      },
    },
  })
} catch (err) {
  console.warn('Rollbar config failed', err)

  rollbar = new Client({
    accessToken: '',
    enabled: false,
  })
}

module.exports = { rollbar }
