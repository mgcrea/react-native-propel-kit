/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../packages')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    blacklistRE: blacklist([
      /node_modules\/.*\/node_modules\/react-native\/.*/,
      /packages\/.*\/node_modules\/react-native\/.*/
    ])
  }
};
