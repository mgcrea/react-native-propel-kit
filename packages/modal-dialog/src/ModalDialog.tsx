import React, {
  useState,
  useCallback,
  ReactNode,
  useImperativeHandle,
  forwardRef,
  useContext,
  useEffect,
  RefForwardingComponent
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
  StyleProp
} from 'react-native';
import styled, {css} from 'styled-components/native';
import {BackdropContext, BackdropContextProps} from '@mgcrea/react-native-backdrop-provider';
import Button from './components/Button';

export type Props = ModalProps & {
  cancelTitle?: string;
  children?: ReactNode;
  confirmTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  delay?: number;
  initialVisible?: boolean;
};

export type Handle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

const ModalDialog: RefForwardingComponent<Handle, Props> = (
  {
    animationType = Platform.OS === 'ios' ? 'slide' : 'fade',
    cancelTitle = 'Cancel',
    children,
    confirmTitle = Platform.select({android: 'OK', ios: 'Confirm'}),
    containerStyle,
    delay = 0,
    disabled = false,
    hardwareAccelerated,
    onCancel,
    onConfirm,
    supportedOrientations = ['portrait', 'landscape'],
    title,
    transparent = true,
    initialVisible = false
  },
  ref
) => {
  const backdrop = useContext<BackdropContextProps>(BackdropContext);
  const [isVisible, setIsVisible] = useState(initialVisible);

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

  // Toggle modal
  const toggle = useCallback(() => {
    !isVisible ? show() : hide();
  }, [isVisible, hide, show]);

  // Expose API via an imperative handle
  useImperativeHandle(ref, () => ({show, hide, toggle}), [show, hide, toggle]);
  // useImperativeHandle(ref, () => ({show: () => setIsVisible(true), hide: () => setIsVisible(false), toggle: () => setIsVisible(value => !value)}), []);

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

  return (
    <Modal
      visible={isVisible}
      animationType={animationType}
      {...{hardwareAccelerated, supportedOrientations, transparent}}
    >
      <TouchableWithoutFeedback style={{flex: 1}} onPress={handleModalCancel}>
        <ModalContainer style={containerStyle}>
          <TouchableWithoutFeedback>
            <View>
              <DialogContainer>
                {title ? (
                  <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                  </ModalHeader>
                ) : null}
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  {Platform.OS === 'android' ? <Button onPress={handleModalCancel} title={cancelTitle} /> : null}
                  <Button onPress={handleModalConfirm} title={confirmTitle} />
                </ModalFooter>
              </DialogContainer>
              {Platform.OS === 'ios' ? (
                <DialogContainer>
                  <Button
                    style={{marginVertical: 12, fontWeight: 'bold'}}
                    onPress={handleModalCancel}
                    title={cancelTitle}
                  />
                </DialogContainer>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default forwardRef(ModalDialog);

const ModalContainer = styled.View`
  align-items: stretch;
  height: 100%;
  ${Platform.select({
    ios: css`
      justify-content: flex-end;
    `,
    android: css`
      justify-content: center;
    `
  })}
`;

const DialogContainer = styled.View`
  /* justify-content: center; */
  background-color: white;
  flex-direction: column;
  padding: 0px;
  ${Platform.select({
    android: css`
      border-radius: 2px;
      margin: 0 62px;
      elevation: 4;
    `,
    ios: css`
      border-radius: 12px;
      margin: 0 8px 8px;
      /* margin: 0 24px 24px; */
    `
  })}
`;

const ModalHeader = styled.View`
  padding: 18px;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  ${Platform.select({
    ios: css`
      align-items: center;
    `,
    android: css`
      align-items: flex-start;
    `
  })}
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  ${Platform.select({
    ios: css`
      font-weight: 400;
      color: #888;
    `,
    android: css`
      font-weight: 500;
      color: #333;
      font-size: 20px;
    `
  })}
`;

const ModalBody = styled.View`
  flex-direction: row;
  justify-content: center;
  max-height: 400px;
`;

const ModalFooter = styled.View`
  ${Platform.select({
    ios: css`
      padding: 12px;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
    `,
    android: css`
      /* border-top-width: 1px;
  border-top-color: #eee; */
      padding: 14px 16px;
      flex-direction: row;
      justify-content: flex-end;
    `
  })}
`;
