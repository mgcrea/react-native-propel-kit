import React, {
  useState,
  useCallback,
  ReactNode,
  useImperativeHandle,
  forwardRef,
  useContext,
  useEffect,
  RefForwardingComponent,
  useRef,
  useMemo
} from 'react';
import {
  TouchableOpacity,
  ModalProps,
  ViewStyle,
  Modal,
  Keyboard,
  Platform,
  View,
  TouchableWithoutFeedback,
  Text,
  StyleProp,
  TextStyle,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {BackdropContext, BackdropContextProps} from '@mgcrea/react-native-backdrop-provider';
// import Button from '@mgcrea/react-native-button';
import ModalDialogButton from './components/ModalDialogButton';

export type Props = ModalProps & {
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

export type Handle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

const MAX_HEIGHT = Dimensions.get('window').height;

export const defaultProps = {
  backgroundColor: 'white',
  animationType: Platform.select<ModalProps['animationType']>({android: 'fade', ios: 'slide'}),
  cancelTitle: 'Cancel',
  confirmTitle: Platform.select<string>({android: 'OK', ios: 'Confirm'}),
  transparent: true
};

const ModalDialog: RefForwardingComponent<Handle, Props> = (
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
    ...otherModalProps
  },
  ref
) => {
  const backdrop = useContext<BackdropContextProps>(BackdropContext);
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
        borderTopLeftRadius: styles.headerStyle.borderTopLeftRadius,
        borderTopRightRadius: styles.headerStyle.borderTopRightRadius
      });
    }
    if (!isFooterVisible) {
      Object.assign(inheritedStyles, {
        borderBottomLeftRadius: styles.footerStyle.borderBottomLeftRadius,
        borderBottomRightRadius: styles.footerStyle.borderBottomRightRadius
      });
    }
    return inheritedStyles;
  }, [isHeaderVisible, isFooterVisible]);

  return (
    <Modal visible={isVisible} animationType={animationType} transparent={transparent} {...otherModalProps}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={handleModalCancel}>
        <View style={[styles.modalStyle, modalStyle]}>
          <TouchableWithoutFeedback style={{flex: 1}}>
            <SafeAreaView style={[styles.containerStyle, containerStyle]}>
              {isHeaderVisible ? (
                <View style={[styles.headerStyle, {backgroundColor}, headerStyle]}>
                  {title ? <Text style={titleStyle}>{title}</Text> : null}
                  {message ? <Text style={messageStyle}>{message}</Text> : null}
                </View>
              ) : null}
              <View style={[styles.bodyStyle, inheritedBodyStyle, {backgroundColor}, bodyStyle]}>{children}</View>
              {isFooterVisible ? (
                <View style={[styles.footerStyle, {backgroundColor}, footerStyle]}>
                  {Platform.OS === 'android' && onCancel ? (
                    <ModalDialogButton
                      style={[styles.cancelStyle, cancelStyle]}
                      onPress={handleModalCancel}
                      title={cancelTitle}
                    />
                  ) : null}
                  {onConfirm ? (
                    <ModalDialogButton
                      style={[styles.confirmStyle, confirmStyle]}
                      onPress={handleModalConfirm}
                      title={confirmTitle}
                    />
                  ) : null}
                </View>
              ) : null}
              {Platform.OS === 'ios' && onCancel ? (
                <ModalDialogButton
                  style={[styles.cancelStyle, {backgroundColor}, cancelStyle]}
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
};

export default forwardRef(ModalDialog);

export const styles: {[s: string]: ViewStyle | TextStyle} = {
  modalStyle: Platform.select<ViewStyle>({
    ios: {flex: 1, justifyContent: 'flex-end'},
    android: {flex: 1, justifyContent: 'center'}
  }),
  containerStyle: Platform.select<ViewStyle>({
    ios: {
      flexDirection: 'column',
      alignItems: 'stretch',
      // marginHorizontal: 8, // actionsheet
      marginHorizontal: 24,
      marginBottom: 24,
      maxHeight: MAX_HEIGHT - 8
    },
    android: {
      flexDirection: 'column',
      alignItems: 'stretch',
      // marginHorizontal: 82, // timepicker/spinner
      marginHorizontal: 24,
      elevation: 4,
      maxHeight: MAX_HEIGHT - 8
    }
  }),
  headerStyle: Platform.select<ViewStyle>({
    ios: {alignItems: 'center', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12},
    android: {alignItems: 'flex-start', padding: 16}
  }),
  bodyStyle: Platform.select<ViewStyle>({
    ios: {
      flexShrink: 1,
      flexDirection: 'column'
    },
    android: {
      flexShrink: 1,
      flexDirection: 'column'
    }
  }),
  footerStyle: Platform.select<TextStyle>({
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
  }),
  titleStyle: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 14, fontWeight: '500', textAlign: 'center', color: '#888'},
    android: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'left',
      color: '#333'
    }
  }),
  messageStyle: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 13, fontWeight: '400', textAlign: 'center', color: '#888'},
    android: {paddingVertical: 6, paddingHorizontal: 12, fontSize: 18, fontWeight: '400', color: '#666'}
  }),
  cancelStyle: Platform.select<TextStyle>({
    ios: {marginTop: 24, borderRadius: 12, fontWeight: '600'},
    android: {}
  }),
  confirmStyle: Platform.select<TextStyle>({
    ios: {borderBottomLeftRadius: 12, borderBottomRightRadius: 12, fontWeight: '400'},
    android: {}
  })
};
