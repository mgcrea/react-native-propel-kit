import React, {FunctionComponent} from 'react';
import {ViewStyle, TextStyle, Platform} from 'react-native';
import Button, {ButtonProps} from '@mgcrea/react-native-button';

export type Props = ButtonProps;

// @NOTE Fork defaults away from base button
export const defaultProps = {
  viewStyle: Platform.select<ViewStyle>({
    ios: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      backgroundColor: 'white'
    },
    android: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      backgroundColor: 'white'
    }
  }),
  textStyle: Platform.select<TextStyle>({
    ios: {
      fontSize: 20,
      color: '#007aff' // iOS.systemBlue (@see https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)
    },
    android: {
      fontSize: 16,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#009688' // android.teal500 (@see https://material.io/design/color/the-color-system.html)
    }
  })
};

const ActionSheetOption: FunctionComponent<Props> = ({
  viewStyle = defaultProps.viewStyle,
  textStyle = defaultProps.textStyle,
  ...otherProps
}) => {
  return <Button viewStyle={viewStyle} textStyle={textStyle} activeOpacity={0.5} {...otherProps} />;
};

export default ActionSheetOption;
