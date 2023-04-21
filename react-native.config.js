/* eslint-disable */

module.exports = {
  assets: ['./src/assets/fonts', 'react-native-vector-icons'],
  dependencies: {
    ...(process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
  },
};
