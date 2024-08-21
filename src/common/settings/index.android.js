import { NativeModules } from 'react-native'

const { SharedPreferences } = NativeModules
const _memo = SharedPreferences.getConstants()

/**
 * Android implementation of React Native's Settings js module.
 *
 * NOTE: watch (watchKeys and clearWatch) is not supported.
 *
 * https://facebook.github.io/react-native/docs/settings
 */
const Settings = {
  get(key) {
    return _memo[key]
  },

  set(hash) {
    SharedPreferences.set(hash)
    Object.assign(_memo, hash)
  },

  watchKeys(keys, callback) {
    console.warn('Settings.watchKeys is not yet supported on Android')
    return -1
  },

  clearWatch(watchId) {
    console.warn('Settings.clearWatch is not yet supported on Android')
  },
}

export default Settings
