const defaultConfig = require('./jest.config')

const config = {
  ...defaultConfig,
  haste: {
    defaultPlatform: 'android',
    platforms: ['android', 'ios'],
  },
}

module.exports = config
