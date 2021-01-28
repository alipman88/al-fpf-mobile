import { configForSettingsGroup, getSettingsGroups } from '..'

describe('configForSettingsGroup', () => {
  test('removes settings group prefix from config keys', () => {
    const config = {
      KEY: 'initial',
      TEST_KEY: 'test',
      OTHER_KEY: 'other',
    }

    expect(configForSettingsGroup(config, 'test')).toEqual({
      KEY: 'test',
      TEST_KEY: 'test',
      OTHER_KEY: 'other',
      ORIGINAL_CONFIG: config,
    })
  })
})

describe('getSettingsGroups', () => {
  test('gets settings groups from config', () => {
    expect(getSettingsGroups()).toEqual(['', 'test', 'development'])
  })
})
