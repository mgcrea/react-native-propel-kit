import React from 'react';
import {AppRegistry, View, YellowBox} from 'react-native';
import {getStorybookUI, addDecorator, configure} from '@storybook/react-native';
import BackdropProvider from '@mgcrea/react-native-backdrop-provider';
import ActionSheetProvider from '@mgcrea/react-native-action-sheet-provider';

import {name as appName} from './app.json';
import Logo from './stories/components/Logo';
import CenteredView from './stories/components/CenteredView';
// import './rn-addons';

// Disable noisy warnings
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillMount is deprecated',
  'Warning: Async Storage has been extracted'
]);

// Layout
addDecorator(storyFn => (
  <BackdropProvider>
    <ActionSheetProvider>
      <View style={{flex: 1, alignItems: 'stretch', backgroundColor: '#3F51B5'}}>
        <Logo />
        <CenteredView>{storyFn()}</CenteredView>
      </View>
    </ActionSheetProvider>
  </BackdropProvider>
));
// Allow hooks
addDecorator(Story => <Story />);

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);
