const {NODE_ENV = 'development'} = process.env;

const moduleNameMapperOptions = {
  moduleNameMapper: {
    '^src/(.*)': '<pkgDir>/src/$1'
  }
};

const presets = [
  ['module:metro-react-native-babel-preset', {enableBabelRuntime: true, useTransformReactJSXExperimental: false}]
];
const plugins = [['babel-plugin-module-name-mapper', moduleNameMapperOptions]];

// if (NODE_ENV !== 'production') {
//   moduleNameMapperOptions.moduleNameMapper['^@mgcrea/react-native-([^/]+)$'] = '<rootDir>/packages/$1/src';
// }

module.exports = {
  presets,
  plugins
};
