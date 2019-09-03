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
      // paddingVertical: 17,
      height: 56
      // backgroundColor: 'white'
    },
    android: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      // height: 50,
      paddingVertical: 10,
      // marginVertical: 8,
      marginRight: 8,
      marginBottom: 3,
      borderRadius: 2,
      minWidth: 56
    }
  }),
  textStyle: Platform.select<TextStyle>({
    ios: {
      fontSize: 20,
      color: '#007aff' // iOS.systemBlue (@see https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)
    },
    android: {
      fontSize: 14,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      paddingHorizontal: 8,
      paddingBottom: 2,
      color: 'black'
    }
  })
};

const ModalDialogButton: FunctionComponent<Props> = ({
  viewStyle = defaultProps.viewStyle,
  textStyle = defaultProps.textStyle,
  ...otherProps
}) => {
  return <Button viewStyle={viewStyle} textStyle={textStyle} activeOpacity={0.5} {...otherProps} />;
};

export default ModalDialogButton;
