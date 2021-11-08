import React from 'react';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
// import {ThemeProvider} from 'styled-components/native';
import {BackdropProvider} from '@mgcrea/react-native-backdrop-provider';
import {StatusBar} from 'react-native';

export const decorators = [
  withBackgrounds,
  Story => (
    // <ThemeProvider theme="default">
    <BackdropProvider>
      <StatusBar backgroundColor="#61dafb" barStyle={'dark-content'} />
      <Story />
    </BackdropProvider>
    // </ThemeProvider>
  ),
];
export const parameters = {
  backgrounds: [
    {name: 'grey', value: '#eee', default: true},
    {name: 'white', value: 'white'},
    {name: 'black', value: 'black'},
    {name: 'peachpuff', value: 'peachpuff'},
    {name: 'warm', value: 'hotpink'},
    {name: 'cool', value: 'deepskyblue'},
  ],
};
