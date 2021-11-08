import {BackdropContext, BackdropContextValue} from '@mgcrea/react-native-backdrop-provider';
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  Dimensions,
  Keyboard,
  Modal,
  ModalProps,
  Platform,
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import {ModalDialogButton} from './components';

export type ModalDialogProps = ModalProps & {
  defaultStyles?: typeof defaultStyles;
  backgroundColor?: string;
  cancelTitle?: string;
  cancelStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  confirmTitle?: string;
  confirmStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  message?: string;
  messageStyle?: StyleProp<TextStyle>;
  delay?: number;
  initialVisible?: boolean;
};

export type ModalDialogHandle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

const {height: WINDOW_HEIGHT} = Dimensions.get('window');

export const defaultProps = {
  backgroundColor: 'white',
  animationType: Platform.select<ModalProps['animationType']>({android: 'fade', ios: 'slide'})!,
  cancelTitle: 'Cancel',
  confirmTitle: Platform.select<string>({android: 'OK', ios: 'Confirm'})!,
  transparent: true
};

export const ModalDialog = forwardRef<ModalDialogHandle, ModalDialogProps>(
  (
    {
      animationType = defaultProps.animationType,
      backgroundColor = defaultProps.backgroundColor,
      cancelTitle = defaultProps.cancelTitle,
      cancelStyle,
      confirmTitle = defaultProps.confirmTitle,
      confirmStyle,
      bodyStyle,
      modalStyle,
      containerStyle,
      children,
      delay = 0,
      disabled = false,
      onCancel,
      onConfirm,
      title,
      titleStyle,
      message,
      messageStyle,
      headerStyle,
      footerStyle,
      transparent = defaultProps.transparent,
      initialVisible = false,
      defaultStyles: propDefaultStyles = defaultStyles,
      ...otherModalProps
    },
    ref
  ) => {
    const backdrop = useContext<BackdropContextValue>(BackdropContext);
    const [isVisible, setIsVisible] = useState(initialVisible);
    const latestIsVisible = useRef<boolean>(isVisible);

    // Show modal
    const show = useCallback(() => {
      if (disabled) {
        return;
      }
      setIsVisible(true);
    }, [disabled]);

    // Hide modal
    const hide = useCallback(() => {
      if (disabled) {
        return;
      }
      setIsVisible(false);
    }, [disabled]);

    // Track isVisible latest value with a ref
    useEffect(() => {
      latestIsVisible.current = isVisible;
    }, [isVisible]);

    // Toggle modal
    // @NOTE a ref is used to provide a stable context accross renders
    const toggle = useCallback(() => {
      !latestIsVisible.current ? show() : hide();
    }, [latestIsVisible, hide, show]);

    // Expose API via an imperative handle
    useImperativeHandle(ref, () => ({show, hide, toggle}), [show, hide, toggle]);

    // Animate backdrop along "isVisible" prop
    useEffect(() => {
      if (backdrop) {
        isVisible ? backdrop.show() : backdrop.hide();
      }
    }, [backdrop, isVisible]);

    // Toggle keyboard along "isVisible" prop
    useEffect(() => {
      // Force blur on other inputs
      if (isVisible) {
        Keyboard.dismiss();
      }
    }, [isVisible]);

    // Always hide on unmount
    useEffect(() => {
      return () => {
        hide();
      };
    }, [hide]);

    // Close the modal and propagate cancel action
    const handleModalCancel = useCallback(() => {
      if (onCancel) {
        onCancel();
      }
      hide();
    }, [onCancel, hide]);

    // Close the modal and propagate confirm action
    const handleModalConfirm = useCallback(() => {
      if (onConfirm) {
        setTimeout(() => {
          onConfirm();
        }, delay);
      }
      hide();
    }, [onConfirm, hide, delay]);

    const isHeaderVisible = title || message;
    const isFooterVisible = (Platform.OS === 'android' && onCancel) || onConfirm;
    const inheritedBodyStyle = useMemo<ViewStyle>(() => {
      const inheritedStyles = {};
      if (!isHeaderVisible) {
        Object.assign(inheritedStyles, {
          borderTopLeftRadius: propDefaultStyles.header.borderTopLeftRadius,
          borderTopRightRadius: propDefaultStyles.header.borderTopRightRadius
        });
      }
      if (!isFooterVisible) {
        Object.assign(inheritedStyles, {
          borderBottomLeftRadius: propDefaultStyles.footer.borderBottomLeftRadius,
          borderBottomRightRadius: propDefaultStyles.footer.borderBottomRightRadius
        });
      }
      return inheritedStyles;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHeaderVisible, isFooterVisible]);

    return (
      <Modal visible={isVisible} animationType={animationType} transparent={transparent} {...otherModalProps}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={handleModalCancel}>
          <View style={[propDefaultStyles.modal, modalStyle]}>
            <TouchableWithoutFeedback style={{flex: 1}}>
              <SafeAreaView style={[propDefaultStyles.container, containerStyle]}>
                {isHeaderVisible ? (
                  <View style={[propDefaultStyles.header, {backgroundColor}, headerStyle]}>
                    {title ? <Text style={[propDefaultStyles.title, titleStyle]}>{title}</Text> : null}
                    {message ? <Text style={[propDefaultStyles.message, messageStyle]}>{message}</Text> : null}
                  </View>
                ) : null}
                <View style={[propDefaultStyles.body, inheritedBodyStyle, {backgroundColor}, bodyStyle]}>
                  {children}
                </View>
                {isFooterVisible ? (
                  <View style={[propDefaultStyles.footer, {backgroundColor}, footerStyle]}>
                    {Platform.OS === 'android' && onCancel ? (
                      <ModalDialogButton
                        style={[propDefaultStyles.cancel, cancelStyle]}
                        onPress={handleModalCancel}
                        title={cancelTitle}
                      />
                    ) : null}
                    {onConfirm ? (
                      <ModalDialogButton
                        style={[propDefaultStyles.confirm, confirmStyle]}
                        onPress={handleModalConfirm}
                        title={confirmTitle}
                      />
                    ) : null}
                  </View>
                ) : null}
                {Platform.OS === 'ios' && onCancel ? (
                  <ModalDialogButton
                    style={[propDefaultStyles.cancel, {backgroundColor}, cancelStyle]}
                    onPress={handleModalCancel}
                    title={cancelTitle}
                  />
                ) : null}
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

export const defaultStyles = {
  modal: Platform.select<ViewStyle>({
    ios: {flex: 1, justifyContent: 'flex-end'},
    android: {flex: 1, justifyContent: 'center'}
  })!,
  container: Platform.select<ViewStyle>({
    ios: {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginHorizontal: 8,
      marginBottom: 8,
      maxHeight: WINDOW_HEIGHT - 8
    },
    android: {
      flexDirection: 'column',
      alignItems: 'stretch',
      // marginHorizontal: 82, // timepicker/spinner
      marginHorizontal: 24,
      elevation: 4,
      maxHeight: WINDOW_HEIGHT - 8
    }
  })!,
  header: Platform.select<ViewStyle>({
    ios: {alignItems: 'center', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12},
    android: {alignItems: 'flex-start', padding: 16}
  })!,
  body: Platform.select<ViewStyle>({
    ios: {
      flexShrink: 1,
      flexDirection: 'column'
    },
    android: {
      flexShrink: 1,
      flexDirection: 'column'
    }
  })!,
  footer: Platform.select<TextStyle>({
    ios: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12
    },
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
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'left',
      color: '#333'
    }
  })!,
  message: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 13, fontWeight: '400', textAlign: 'center', color: '#888'},
    android: {paddingVertical: 6, paddingHorizontal: 12, fontSize: 18, fontWeight: '400', color: '#666'}
  })!,
  cancel: Platform.select<TextStyle>({
    ios: {marginTop: 24, borderRadius: 12, fontWeight: '600'},
    android: {}
  })!,
  confirm: Platform.select<TextStyle>({
    ios: {borderBottomLeftRadius: 12, borderBottomRightRadius: 12, fontWeight: '400'},
    android: {}
  })!
};
