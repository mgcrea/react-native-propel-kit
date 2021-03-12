import ModalDialog, {ModalDialogHandle, ModalDialogProps} from '@mgcrea/react-native-modal-dialog';
import React, {forwardRef, ForwardRefRenderFunction, useMemo} from 'react';
import {
  ActionSheetIOSOptions,
  Dimensions,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle
} from 'react-native';
import ActionSheetOption from './components/ActionSheetOption';
import isUndefined from './utils/isUndefined';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const IOS_OPACITY = 0.85; // @NOTE from native ActionSheet (though it uses blur)

export type ActionSheetProps = Pick<ScrollViewProps, 'scrollEnabled'> &
  Omit<ModalDialogProps, 'onConfirm' | 'confirmTitle' | 'confirmStyle'> &
  ActionSheetIOSOptions & {
    defaultStyles?: typeof defaultStyles;
    optionStyle?: StyleProp<TextStyle>;
    lastOptionExtraStyle?: StyleProp<TextStyle>;
    destructiveButtonColor?: string;
    onButtonPress: (buttonIndex: number) => void;
    onCancel: () => void;
  };

export const defaultProps = {
  backgroundColor: 'white',
  cancelTitle: 'Cancel',
  destructiveButtonColor: Platform.select({
    ios: '#ff3b30', // iOS.systemRed (@see https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)
    android: '#f44336' // android.red500 (@see https://material.io/design/color/the-color-system.html)
  })!
};

const ActionSheetRenderFunction: ForwardRefRenderFunction<ModalDialogHandle, ActionSheetProps> = (
  {
    options,
    backgroundColor = defaultProps.backgroundColor,
    optionStyle: propOptionStyle,
    lastOptionExtraStyle: propLastOptionExtraStyle,
    cancelButtonIndex,
    destructiveButtonIndex,
    destructiveButtonColor = defaultProps.destructiveButtonColor,
    onButtonPress,
    scrollEnabled: propScrollEnabled,
    defaultStyles: propDefaultStyles = defaultStyles,
    ...otherModalDialogProps
  },
  ref
) => {
  const cancelTitle = !isUndefined(cancelButtonIndex) && options[cancelButtonIndex] ? options[cancelButtonIndex] : '';
  const scrollEnabled = !isUndefined(cancelButtonIndex) ? options.length > 6 : propScrollEnabled;

  const optionStyle = useMemo<ViewStyle>(
    () => StyleSheet.flatten([propDefaultStyles.option, {backgroundColor}, propOptionStyle]),
    [propDefaultStyles, backgroundColor, propOptionStyle]
  );
  const lastOptionExtraStyle = useMemo<ViewStyle>(
    () => StyleSheet.flatten([propDefaultStyles.lastOptionExtra, propLastOptionExtraStyle]),
    [propDefaultStyles, propLastOptionExtraStyle]
  );

  return (
    <ModalDialog
      ref={ref}
      defaultStyles={propDefaultStyles}
      backgroundColor={backgroundColor}
      cancelTitle={cancelTitle}
      bodyStyle={{backgroundColor: 'transparent'}}
      {...otherModalDialogProps}>
      <ScrollView scrollEnabled={scrollEnabled}>
        {options.map((buttonTitle, buttonIndex) => {
          // Skip cancel button
          if (!isUndefined(cancelButtonIndex) && buttonIndex === cancelButtonIndex) {
            return null;
          }

          const color: string =
            destructiveButtonIndex && buttonIndex === destructiveButtonIndex ? destructiveButtonColor : '';
          return (
            <ActionSheetOption
              style={[optionStyle as TextStyle].concat(
                color ? [{color}] : [],
                buttonIndex === options.length - 1 ? [lastOptionExtraStyle] : []
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

export const ActionSheet = forwardRef(ActionSheetRenderFunction);

export const defaultStyles = {
  modal: Platform.select<ViewStyle>({
    ios: {flex: 1, justifyContent: 'flex-end'},
    android: {flex: 1, justifyContent: 'center'}
  })!,
  container: Platform.select<ViewStyle>({
    ios: {margin: 8, maxHeight: WINDOW_HEIGHT - 8 * 2},
    android: {
      flexDirection: 'column',
      alignItems: 'stretch',
      // marginHorizontal: 82, // timepicker/spinner
      margin: 24,
      maxHeight: WINDOW_HEIGHT - 24 * 2,
      elevation: 4
    }
  })!,
  header: Platform.select<ViewStyle>({
    ios: {
      alignItems: 'center',
      padding: 16,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      opacity: IOS_OPACITY
    },
    android: {alignItems: 'flex-start', paddingVertical: 24, paddingHorizontal: 32}
  })!,
  body: Platform.select<ViewStyle>({
    ios: {
      flexShrink: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      opacity: IOS_OPACITY,
      borderBottomStartRadius: 12,
      borderBottomEndRadius: 12
    },
    android: {
      flexShrink: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent'
    }
  })!,
  footer: Platform.select<TextStyle>({
    ios: {}, // @NOTE we don't have a footer on iOS
    android: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      padding: 8
    }
  })!,
  title: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 14, fontWeight: '500', textAlign: 'center', color: '#888'},
    android: {
      paddingBottom: 12,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'left',
      color: '#333'
    }
  })!,
  message: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 13, fontWeight: '400', textAlign: 'center', color: '#888'},
    android: {paddingBottom: 12, fontSize: 18, fontWeight: '400', color: '#666'}
  })!,
  cancel: Platform.select<TextStyle>({
    ios: {marginTop: 8, borderRadius: 12, fontWeight: '600'},
    android: {}
  })!,
  confirm: Platform.select<TextStyle>({
    ios: {}, // @NOTE we don't have a confirm on iOS
    android: {}
  })!,
  option: Platform.select<TextStyle>({
    ios: {
      marginTop: StyleSheet.hairlineWidth
    },
    android: {
      marginTop: StyleSheet.hairlineWidth
    }
  })!,
  lastOptionExtra: Platform.select<TextStyle>({
    ios: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12
    },
    android: {
      marginBottom: StyleSheet.hairlineWidth
    }
  })!
};
