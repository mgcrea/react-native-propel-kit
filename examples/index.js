import React from 'react';
import {
  AppRegistry,
  View,
  YellowBox,
  Platform,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import {
  getStorybookUI,
  addDecorator,
  addParameters,
  configure,
} from '@storybook/react-native';
import asyncStorage from '@react-native-community/async-storage';
import './stories/defaults';

import BackdropProvider from '@mgcrea/react-native-backdrop-provider';
import ActionSheetProvider from '@mgcrea/react-native-action-sheet-provider';

import {name as appName} from './app.json';
import Logo from './stories/components/Logo';
import CenteredView from './stories/components/CenteredView';
// import androidNativeTimePicker from './stories/fixtures/androidNativeTimePicker.png';
// import iosNativeActionSheet from './stories/fixtures/iosNativeActionSheet.png';
// import './rn-addons';

// Disable noisy warnings
// YellowBox.ignoreWarnings([
//   'Warning: TimePickerAndroid has been merged',
//   'Warning: DatePickerAndroid has been merged',
//   'Warning: DatePickerIOS has been merged',
//   'Warning: componentWillReceiveProps has been renamed',
//   'Warning: componentWillMount has been renamed',
//   'Warning: AsyncStorage has been extracted',
//   'Story with id',
// ]);

const WITH_MOCKUP = false;
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('screen');

// Layout
addDecorator((storyFn) => (
  <BackdropProvider>
    <ActionSheetProvider native={false}>
      <StatusBar barStyle="light-content" />
      {/* <Image
        source={androidNativeTimePicker}
        style={{
          ...StyleSheet.absoluteFillObject,
          top: -30,
          width: 1080 / PixelRatio.get(),
          height: 2160 / PixelRatio.get()
        }}
      /> */}
      {/* {WITH_MOCKUP && Platform.OS === 'ios' ? (
        <Image
          source={iosNativeActionSheet}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
          }}
        />
      ) : null} */}
      <View
        style={{
          flex: 1,
          opacity: WITH_MOCKUP ? 0.5 : 1,
          alignItems: 'stretch',
          backgroundColor: '#3F51B5',
        }}>
        <Logo />
        <CenteredView>{storyFn()}</CenteredView>
      </View>
    </ActionSheetProvider>
  </BackdropProvider>
));
// Allow hooks
addDecorator((Story) => <Story />);

// addParameters({
//   // options: {
//   isToolshown: false,
//   showNav: false,
//   showPanel: false,
//   isFullscreen: true,
//   // },
// });

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage,
  // isUIHidden: true,
  // tabOpen: -1,
});

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);
