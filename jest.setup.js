import { configure } from 'enzyme'

// Enzyme is dead and does not support React 17 or 18. Use an unofficial adapater.
// https://github.com/enzymejs/enzyme/issues/2429
import Adapter from '@cfaester/enzyme-adapter-react-18'

configure({ adapter: new Adapter() })

require('jest-fetch-mock').enableMocks()

jest.mock(
  'react-native/Libraries/PermissionsAndroid/PermissionsAndroid',
  () => ({
    PERMISSIONS: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
      CAMERA: 'android.permission.CAMERA',
      POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS',
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
      NEVER_ASK_AGAIN: 'never_ask_again',
    },
    request: jest.fn(() => Promise.resolve('granted')),
    check: jest.fn(() => Promise.resolve(true)),
  }),
)

global.window = global
global.window.__TEST__ = true

jest.useFakeTimers()
