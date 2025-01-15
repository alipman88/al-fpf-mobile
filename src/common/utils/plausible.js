import DeviceInfo from 'react-native-device-info'

import Plausible from './plausibleTracker'
import { Config } from '@fpf/common/config'

let domain

switch (Config.ENVIRONMENT) {
  case 'production':
    domain = 'frontporchforum.com'
    break
  case 'development':
    domain = 'localhost.frontporchforum.com'
    break
  default:
    domain = 'staging.frontporchforum.com'
}

/**
 * Common plausible object for page view and custom event analytics.
 */
export const plausible = Plausible({
  domain,
  props: {
    app: 'mobile',
    version: DeviceInfo.getVersion(),
  },
})
