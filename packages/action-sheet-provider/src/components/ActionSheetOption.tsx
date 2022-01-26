import {Pressable, PressableProps} from '@mgcrea/react-native-button';
import React, {FunctionComponent} from 'react';
import {Platform, TextStyle, ViewStyle} from 'react-native';

export type Props = PressableProps;

export const defaultStyles = {
  view: Platform.select<ViewStyle>({
    ios: {
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      height: 56,
      alignItems: 'center'
    },
    android: {
      // flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      height: 56,
      alignItems: 'center'
    }
  }),
  disabledView: Platform.select<ViewStyle>({
    ios: {},
    android: {}
  }),
  text: Platform.select<TextStyle>({
    ios: {
      fontSize: 20,
      color: '#007aff' // iOS.systemBlue (@see https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)
    },
    android: {
      fontSize: 16,
      padding: 12,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#009688' // android.teal500 (@see https://material.io/design/color/the-color-system.html)
    }
  }),
  disabledText: Platform.select<TextStyle>({
    ios: {color: '#cdcdcd'},
    android: {color: '#cdcdcd'}
  })
};

const ActionSheetOption: FunctionComponent<Props> = ({...otherPressableProps}) => {
  return <Pressable defaultStyles={defaultStyles} activeOpacity={0.5} {...otherPressableProps} />;
};

export default ActionSheetOption;
