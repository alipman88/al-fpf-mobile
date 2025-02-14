import { Client } from 'rollbar-react-native'
import DeviceInfo from 'react-native-device-info'

import { Config } from '@fpf/common/config'

let rollbar

try {
  const version = DeviceInfo.getBuildNumber()

  if (Config.ROLLBAR_API_KEY) {
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
  }
} catch (err) {
  console.warn('Rollbar config failed', err)
}

// If rollbar couldn't be configured, set up a disabled object so that clients
// don't need to check for its existence/enabled state
if (!rollbar) {
  rollbar = new Client({
    accessToken: 'NO KEY', // a blank string results in an exception
    enabled: false,
  })
}

module.exports = { rollbar }
