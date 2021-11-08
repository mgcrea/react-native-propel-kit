module.exports = {
  presets: [['module:metro-react-native-babel-preset', {enableBabelRuntime: false}]],
  plugins: [
    [
      'babel-plugin-module-name-mapper',
      {
        moduleNameMapper: {
          '^react$': '<rootDir>/node_modules/react',
          '^react-dom$': '<rootDir>/node_modules/react-dom',
          '^react-native$': '<rootDir>/node_modules/react-native',
          '^styled-components/native$': '<rootDir>/node_modules/styled-components/native',
          '^@storybook/react-native$': '<rootDir>/node_modules/@storybook/react-native',
          '^@react-native-picker/picker$': '<rootDir>/node_modules/@react-native-picker/picker',
          '^@react-native-community/datetimepicker$': '<rootDir>/node_modules/@react-native-community/datetimepicker',
          '^@mgcrea/react-native-([^/]+)/stories$': '<rootDir>/../packages/$1/stories',
          '^@mgcrea/react-native-([^/]+)$': '<rootDir>/../packages/$1/src',
        },
      },
    ],
  ],
};
