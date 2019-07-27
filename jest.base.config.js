// const {defaults} = require('jest-config');

module.exports = {
  preset: 'react-native',
  // moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/.history'],

  // modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  // roots: ['<rootDir>/src/', '<rootDir>/test/'],
  // setupFiles: ['<rootDir>/test/setup.ts'],
  // setupFilesAfterEnv: ['<rootDir>/test/framework.ts'],
  testEnvironment: 'node',
  // transform: {'^.+\\.[t|j]sx?$': 'babel-jest'},
  // testMatch: ['**/?(*.)+(spec|test).(j|t)s?(x)'],
  // transform: {'^.+\\.(j|t)sx?$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'},
  moduleNameMapper: {
    // '^react$': '<rootDir>/node_modules/react',
    // '^react-native$': '<rootDir>/node_modules/react-native',
    '^@mgcrea/react-native-([^/]+)$': '<rootDir>/../$1/src'
  }
  // transform: {
  //   '\\.(mjml)$': '<rootDir>/test/mjmlTransformer.js'
  // }
};
