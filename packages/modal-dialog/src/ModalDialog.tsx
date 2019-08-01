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
  Dimensions
} from 'react-native';
import {BackdropContext, BackdropContextProps} from '@mgcrea/react-native-backdrop-provider';
// import Button from './components/Button';
import Button from '@mgcrea/react-native-button';

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
    ios: {marginHorizontal: 8, maxHeight: MAX_HEIGHT - 8},
    android: {}
  }),
  headerStyle: Platform.select<ViewStyle>({
    ios: {alignItems: 'center', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12},
    android: {alignItems: 'flex-start', padding: 16}
  }),
  bodyStyle: Platform.select<ViewStyle>({
    ios: {
      flexShrink: 1,
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    android: {
      flexShrink: 1,
      flexDirection: 'column',
      alignItems: 'stretch'
    }
  }),
  footerStyle: Platform.select<TextStyle>({
    ios: {flex: 0, backgroundColor: 'transparent', marginBottom: 8, borderRadius: 12},
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
    ios: {
      fontSize: 20,
      color: '#007aff',
      paddingVertical: 5,
      borderRadius: 12,
      fontWeight: '600'
    },
    android: {}
  }),
  confirmStyle: Platform.select<TextStyle>({
    ios: {
      fontSize: 20,
      color: '#007aff',
      paddingVertical: 5,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      marginBottom: 8,
      fontWeight: '400'
    },
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
            <View style={containerStyle}>
              {isHeaderVisible ? (
                <View style={[{backgroundColor}, headerStyle]}>
                  {title ? <Text style={titleStyle}>{title}</Text> : null}
                  {message ? <Text style={messageStyle}>{message}</Text> : null}
                </View>
              ) : null}
              <View style={[{backgroundColor}, bodyStyle]}>{children}</View>
              {isFooterVisible ? (
                <View style={[{backgroundColor}, footerStyle]}>
                  {onConfirm ? <Button style={confirmStyle} onPress={handleModalConfirm} title={confirmTitle} /> : null}
                  {onCancel ? <Button style={cancelStyle} onPress={handleModalCancel} title={cancelTitle} /> : null}
                </View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default forwardRef(ModalDialog);
