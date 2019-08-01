import React, {forwardRef, RefForwardingComponent} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActionSheetIOSOptions,
  TextStyle,
  ScrollView,
  ScrollViewProps
} from 'react-native';
import ModalDialog, {ModalDialogProps, ModalDialogHandle} from '@mgcrea/react-native-modal-dialog';
import Button from '@mgcrea/react-native-button';

import isUndefined from './utils/isUndefined';

export type Props = Pick<ScrollViewProps, 'scrollEnabled'> &
  Omit<ModalDialogProps, 'onConfirm' | 'confirmTitle' | 'confirmStyle'> &
  ActionSheetIOSOptions & {
    optionStyle?: StyleProp<TextStyle>;
    lastOptionExtraStyle?: StyleProp<TextStyle>;
    destructiveButtonColor?: string;
    onButtonPress: (buttonIndex: number) => void;
    onCancel: () => void;
  };

const MAX_HEIGHT = Dimensions.get('window').height;

export const defaultProps = {
  backgroundColor: 'white',
  cancelTitle: 'Cancel',
  destructiveButtonColor: Platform.select({
    ios: '#ff3b2f',
    android: '#ff3b2f'
  }),
  containerStyle: Platform.select<ViewStyle>({
    ios: {marginHorizontal: 8, maxHeight: MAX_HEIGHT - 8},
    android: {}
  }),
  headerStyle: Platform.select<ViewStyle>({
    ios: {alignItems: 'center', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, opacity: 0.94},
    android: {alignItems: 'flex-start', padding: 16}
  }),
  bodyStyle: Platform.select<ViewStyle>({
    ios: {
      flexShrink: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      opacity: 0.94
    },
    android: {
      flexShrink: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent'
    }
  }),
  footerStyle: Platform.select<TextStyle>({
    ios: {flex: 0, backgroundColor: 'transparent', marginVertical: 8, borderRadius: 12},
    android: {}
  }),
  titleStyle: Platform.select<TextStyle>({
    ios: {paddingBottom: 10, fontSize: 14, fontWeight: '500', textAlign: 'center', color: '#888'},
    android: {fontSize: 20, fontWeight: '500', color: '#333'}
  }),
  messageStyle: Platform.select<TextStyle>({
    ios: {paddingBottom: 8, fontSize: 13, fontWeight: '400', textAlign: 'center', color: '#888'},
    android: {fontSize: 20, fontWeight: '400', color: '#333'}
  }),
  cancelStyle: Platform.select<TextStyle>({
    ios: {fontSize: 20, color: '#007aff', paddingVertical: 5, borderRadius: 12, fontWeight: '600'},
    android: {}
  }),
  optionStyle: Platform.select<TextStyle>({
    ios: {
      fontSize: 20,
      color: '#007aff',
      paddingBottom: 5,
      paddingTop: 5 - StyleSheet.hairlineWidth,
      marginTop: StyleSheet.hairlineWidth,
      borderRadius: 0
    },
    android: {fontSize: 20}
  }),
  lastOptionExtraStyle: Platform.select<TextStyle>({
    ios: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12
    },
    android: {fontSize: 20}
  })
};

const ActionSheet: RefForwardingComponent<ModalDialogHandle, Props> = (
  {
    options,
    backgroundColor = defaultProps.backgroundColor,
    title,
    titleStyle = defaultProps.titleStyle,
    message,
    messageStyle = defaultProps.messageStyle,
    optionStyle = defaultProps.optionStyle,
    containerStyle = defaultProps.containerStyle,
    lastOptionExtraStyle = defaultProps.lastOptionExtraStyle,
    headerStyle = defaultProps.headerStyle,
    bodyStyle = defaultProps.bodyStyle,
    footerStyle = defaultProps.footerStyle,
    cancelStyle = defaultProps.cancelStyle,
    cancelButtonIndex,
    destructiveButtonIndex,
    destructiveButtonColor = defaultProps.destructiveButtonColor,
    onButtonPress,
    onCancel,
    scrollEnabled: propScrollEnabled,
    ...otherModalProps
  },
  ref
) => {
  const cancelTitle = !isUndefined(cancelButtonIndex) && options[cancelButtonIndex] ? options[cancelButtonIndex] : '';
  const scrollEnabled = !isUndefined(cancelButtonIndex) ? options.length > 6 : propScrollEnabled;

  return (
    <ModalDialog
      {...{
        ref,
        backgroundColor,
        title,
        titleStyle,
        message,
        containerStyle,
        messageStyle,
        onCancel,
        cancelTitle,
        headerStyle,
        bodyStyle,
        footerStyle,
        cancelStyle
      }}
      {...otherModalProps}
    >
      <ScrollView scrollEnabled={scrollEnabled}>
        {options.map((buttonTitle, buttonIndex) => {
          // Skip cancel button
          if (!isUndefined(cancelButtonIndex) && buttonIndex === cancelButtonIndex) {
            return null;
          }

          const color: string =
            destructiveButtonIndex && buttonIndex === destructiveButtonIndex ? destructiveButtonColor : '';
          return (
            <Button
              style={[optionStyle].concat(
                color ? {color} : false,
                buttonIndex === options.length - 1 ? lastOptionExtraStyle : false
              )}
              onPress={() => onButtonPress(buttonIndex)}
              title={buttonTitle}
              key={`${buttonIndex}`} // eslint-disable-line react/no-array-index-key
            />
          );
        })}
      </ScrollView>
    </ModalDialog>
  );
};

export default forwardRef(ActionSheet);
