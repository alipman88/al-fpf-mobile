const defaultConfig = require('./jest.config')

const config = {
  ...defaultConfig,
  haste: {
    defaultPlatform: 'ios',
    platforms: ['android', 'ios'],
  },
}

module.exports = config
