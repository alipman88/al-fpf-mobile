import { default as ReactNativeConfig } from 'react-native-config'
import { chain } from 'lodash'

import Settings from '@fpf/common/settings'

const SETTINGS_GROUP_KEY = 'CONFIG_SETTINGS_GROUP'

/**
 * Gets the currently configured settings group name from the settings.
 * Default: configured environment.
 */
const getSettingsGroup = () =>
  Settings.get(SETTINGS_GROUP_KEY) || ReactNativeConfig.ENVIRONMENT

/**
 * Stores the settings group name in the settings.
 */
const setSettingsGroup = (settingsGroup) =>
  Settings.set({ [SETTINGS_GROUP_KEY]: settingsGroup })

/**
 * Gets a list of all the settings group names lower cased.
 *
 * Looks for config keys with names that match the pattern *API_HOST, and
 * returns the unique prefixes with "_API_HOST" removed.  Note that this will
 * include "" if there's a config key that's just a bare "API_HOST".
 *
 * @returns {array<string>}
 */
const getSettingsGroups = () => {
  const suffix = 'API_HOST'

  return chain(Object.keys(ReactNativeConfig))
    .filter((key) => key.endsWith(suffix))
    .map((key) => key.slice(0, -(suffix.length + 1)).toLowerCase())
    .uniq()
    .value()
}

/**
 * Returns an object with react-native-config constants, where keys with the
 * given settings group string as a prefix are included in the object with that
 * settings group prefix stripped.  The original config is included under the
 * key ORIGINAL_CONFIG.
 *
 * For example, if the current settings group is "development", env vars (or
 * values in the .env file) with names like "DEVELOPMENT_API_KEY" will be copied
 * into the returned object as "API_KEY", overwriting any such existing keys.
 *
 * @param {object} config - the react-native-config Config object
 * @param {string} settingsGroup - the current settings group name
 * @returns {object}
 */
const configForSettingsGroup = (config, settingsGroup) => {
  settingsGroup = (settingsGroup || '').toUpperCase()
  const prefix = `${settingsGroup}_`

  const mappedConfig = chain(config)
    .pickBy((value, key) => key.startsWith(prefix))
    .mapKeys((value, key) => key.substring(prefix.length))
    .value()

  return Object.assign({}, config, mappedConfig, {
    ORIGINAL_CONFIG: config,
  })
}

/**
 * The react-native-config Config object, with keys updated for the current
 * settings group.
 */
const Config = configForSettingsGroup(ReactNativeConfig, getSettingsGroup())

export {
  Config,
  getSettingsGroup,
  setSettingsGroup,
  getSettingsGroups,
  configForSettingsGroup,
}
