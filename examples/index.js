import ActionSheetProvider from '@mgcrea/react-native-action-sheet-provider';
import BackdropProvider from '@mgcrea/react-native-backdrop-provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {withKnobs} from '@storybook/addon-knobs';
import '@storybook/addon-ondevice-actions/register';
import '@storybook/addon-ondevice-knobs/register';
import {addDecorator, configure, getStorybookUI} from '@storybook/react-native';
import React from 'react';
import {AppRegistry, StatusBar, View} from 'react-native';
import {name as appName} from './app.json';
import CenteredView from './stories/components/CenteredView';
import Logo from './stories/components/Logo';
const WITH_MOCKUP = false;

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

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);
