module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-module-name-mapper',
      {
        moduleNameMapper: {
          '^src/(.*)': '<pkgDir>/src/$1',
          '^react$': '<rootDir>/node_modules/react',
          '^react-native$': '<rootDir>/node_modules/react-native',
          '^styled-components/native$':
            '<rootDir>/node_modules/styled-components/native',
          '^@storybook/react-native$':
            '<rootDir>/node_modules/@storybook/react-native',
          '^@mgcrea/react-native-([^/]+)/stories$':
            '<rootDir>/../packages/$1/stories',
          '^@mgcrea/react-native-([^/]+)$': '<rootDir>/../packages/$1/src',
        },
      },
    ],
    'babel-plugin-styled-components',
  ],
};
