/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
// const exclusionList = require('metro-config/src/defaults/exclusionList');

const resolveModulePath = module => path.resolve(__dirname, `../packages/${module}/`);

const extraNodeModules = {
  '@mgcrea/react-native-action-sheet-provider': resolveModulePath('action-sheet-provider'),
  '@mgcrea/react-native-backdrop-provider': resolveModulePath('backdrop-provider'),
  '@mgcrea/react-native-button': resolveModulePath('button'),
  '@mgcrea/react-native-date-picker': resolveModulePath('date-picker'),
  '@mgcrea/react-native-modal-dialog': resolveModulePath('modal-dialog'),
  '@mgcrea/react-native-select': resolveModulePath('select'),
};

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: Object.values(extraNodeModules),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules,
    resolverMainFields: ['sbmodern', 'browser', 'main'],
    // blacklistRE: exclusionList([
    //   // /node_modules\/.*\/node_modules\/react-native\/.*/,
    //   /packages\/.*\/node_modules\/react-native\/.*/,
    // ]),
  },
};
