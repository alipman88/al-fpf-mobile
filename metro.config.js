/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        // TODO(NMH): set these to true?
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
