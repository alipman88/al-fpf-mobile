// Common jest configuration
const config = {
  preset: 'react-native',
  verbose: true,
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-navigation|@react-native-community|@react-native-picker|react-native-autolink|autolinker|decode-uri-component|split-on-first|filter-obj)',
  ],
}

module.exports = config
