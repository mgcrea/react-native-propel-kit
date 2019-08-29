import React, {
  useState,
  useCallback,
  ReactNode,
  useImperativeHandle,
  forwardRef,
  useContext,
  useEffect,
  RefForwardingComponent,
  useRef
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
// import Button from './components/Button';
import Button from '@mgcrea/react-native-button';
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
  transparent: true,
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
      // alignItems: 'stretch'
    },
    android: {
      flexShrink: 1,
      flexDirection: 'column'
      // alignItems: 'stretch'
    }
  }),
  footerStyle: Platform.select<TextStyle>({
    ios: {backgroundColor: 'transparent', borderRadius: 12},
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
  }),
  style: {}
};

const ModalDialog: RefForwardingComponent<Handle, Props> = (
  {
    animationType = defaultProps.animationType,
    backgroundColor = defaultProps.backgroundColor,
    cancelTitle = defaultProps.cancelTitle,
    cancelStyle = defaultProps.cancelStyle,
    confirmTitle = defaultProps.confirmTitle,
    confirmStyle = defaultProps.confirmStyle,
    bodyStyle = defaultProps.bodyStyle,
    modalStyle = defaultProps.modalStyle,
    containerStyle = defaultProps.containerStyle,
    children,
    delay = 0,
    disabled = false,
    onCancel,
    onConfirm,
    title,
    titleStyle = defaultProps.titleStyle,
    message,
    messageStyle = defaultProps.messageStyle,
    headerStyle = defaultProps.headerStyle,
    footerStyle = defaultProps.footerStyle,
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
  const isFooterVisible = onCancel || onConfirm;

  return (
    <Modal visible={isVisible} animationType={animationType} transparent={transparent} {...otherModalProps}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={handleModalCancel}>
        <View style={modalStyle}>
          <TouchableWithoutFeedback style={{flex: 1}}>
            <SafeAreaView style={containerStyle}>
              {isHeaderVisible ? (
                <View style={[{backgroundColor}, headerStyle]}>
                  {title ? <Text style={titleStyle}>{title}</Text> : null}
                  {message ? <Text style={messageStyle}>{message}</Text> : null}
                </View>
              ) : null}
              <View style={[{backgroundColor}, bodyStyle]}>{children}</View>
              {isFooterVisible ? (
                <View style={[{backgroundColor}, footerStyle]}>
                  {Platform.OS === 'ios' && onConfirm ? (
                    <ModalDialogButton style={confirmStyle} onPress={handleModalConfirm} title={confirmTitle} />
                  ) : null}
                  {onCancel ? (
                    <ModalDialogButton style={cancelStyle} onPress={handleModalCancel} title={cancelTitle} />
                  ) : null}
                  {Platform.OS === 'android' && onConfirm ? (
                    <ModalDialogButton style={confirmStyle} onPress={handleModalConfirm} title={confirmTitle} />
                  ) : null}
                </View>
              ) : null}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default forwardRef(ModalDialog);
