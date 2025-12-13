export default {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          src: "./src",
        },
      },
    ],
    [
      "@mgcrea/react-native-tailwind/babel",
      {
        attributes: ["className", "*ClassName"],
      },
    ],
  ],
};
