// const {defaults} = require('jest-config');

module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/../../test/setup.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@mgcrea/react-native-([^/]+)$': '<rootDir>/../../packages/$1/src'
  }
};
