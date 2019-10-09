import { NativeModules } from 'react-native'

const NativeSettingsManager = NativeModules.SettingsManager
const _settings = NativeSettingsManager.getConstants().settings || {}

/**
 * Android implementation of React Native's Settings js module.
 *
 * NOTE: watch (watchKeys and clearWatch) is not supported.
 *
 * https://facebook.github.io/react-native/docs/settings
 * https://github.com/facebook/react-native/tree/master/Libraries/Settings
 */
const Settings = {
  _settings,

  get(key) {
    return this._settings[key]
  },

  set(settings) {
    Object.assign(this._settings, settings)

    if (NativeSettingsManager) {
      NativeSettingsManager.setValues(settings)
    }
  },

  watchKeys(keys, callback) {
    console.warn('Settings.watchKeys is not yet supported on Android')
    return -1
  },

  clearWatch(watchId) {
    console.warn('Settings.clearWatch is not yet supported on Android')
  }
}

export default Settings
