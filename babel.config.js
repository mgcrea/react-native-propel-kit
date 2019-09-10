const {NODE_ENV = 'development'} = process.env;

const moduleNameMapperOptions = {
  moduleNameMapper: {
    '^src/(.*)': '<pkgDir>/src/$1',
    // '^react$': '<rootDir>/node_modules/react',
    // '^react-native$': '<rootDir>/node_modules/react-native'
    // '^@storybook/react-native$': '<rootDir>/node_modules/@storybook/react-native',
    '^@mgcrea/react-native-([^/]+)/stories$': '<rootDir>/../packages/$1/stories'
  }
};

const presets = ['module:metro-react-native-babel-preset', '@babel/preset-typescript'];
const plugins = [['babel-plugin-module-name-mapper', moduleNameMapperOptions], '@babel/plugin-transform-runtime'];

if (NODE_ENV !== 'production') {
  moduleNameMapperOptions.moduleNameMapper['^@mgcrea/react-native-([^/]+)$'] = '<rootDir>/../../packages/$1/src';
}

module.exports = {
  presets,
  plugins
};
