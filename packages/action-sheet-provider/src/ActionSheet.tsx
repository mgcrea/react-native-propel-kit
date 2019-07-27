import React, {useCallback, useRef, FunctionComponent, useState, useEffect, useContext} from 'react';
import {
  Platform,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ModalProps,
  StyleProp,
  ViewStyle,
  ActionSheetIOSOptions
} from 'react-native';
import styled, {css} from 'styled-components/native';
import {BackdropContext, BackdropContextProps} from '@mgcrea/react-native-backdrop-provider';
import isUndefined from './utils/isUndefined';
import Button from './components/Button';

export type Props = ModalProps &
  ActionSheetIOSOptions & {
    isVisible?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    onButtonPress: (buttonIndex: number) => void;
    onCancel: () => void;
  };

export const defaultProps: {[K in keyof Props]-?: NonNullable<Props[K]>} = {
  animationType: Platform.OS === 'ios' ? 'slide' : 'fade',
  transparent: true,
  supportedOrientations: ['portrait', 'landscape']
};

// @NOTE uncontrolled usage is not functionnal
const ActionSheet: FunctionComponent<Props> = ({
  animationType = defaultProps.animationType,
  hardwareAccelerated,
  transparent = defaultProps.transparent,
  supportedOrientations = defaultProps.supportedOrientations,
  options,
  title,
  cancelButtonIndex,
  destructiveButtonIndex,
  containerStyle,
  isVisible,
  onButtonPress,
  onCancel
}) => {
  const cancelButtonTitle =
    !isUndefined(cancelButtonIndex) && options[cancelButtonIndex] ? options[cancelButtonIndex] : null;

  // @NOTE TouchableNativeFeedback is broken
  return (
    <Modal
      visible={isVisible}
      animationType={animationType}
      {...{hardwareAccelerated, supportedOrientations, transparent}}
    >
      <TouchableOpacity style={{flex: 1}} onPress={onCancel}>
        <ModalContainer style={containerStyle}>
          <TouchableWithoutFeedback>
            <View>
              <ModalDialog>
                {title ? (
                  <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                  </ModalHeader>
                ) : null}
                {options.map((buttonTitle, buttonIndex) => {
                  // Skip cancel button
                  if (!isUndefined(cancelButtonIndex) && buttonIndex === cancelButtonIndex) {
                    return null;
                  }
                  const color =
                    destructiveButtonIndex && buttonIndex === destructiveButtonIndex ? '#ff190c' : '#222222';
                  return (
                    <Button
                      style={{marginVertical: 12, color}}
                      onPress={() => onButtonPress(buttonIndex)}
                      title={buttonTitle}
                      key={`${buttonIndex}`}
                    />
                  );
                })}
                <ModalFooter>
                  {cancelButtonTitle ? (
                    <Button
                      containerStyle={{marginRight: 8}}
                      onPress={() => onButtonPress(cancelButtonIndex as number)}
                      title={cancelButtonTitle}
                    />
                  ) : null}
                </ModalFooter>
              </ModalDialog>
            </View>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableOpacity>
    </Modal>
  );
};

export default ActionSheet;

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

const ModalDialog = styled.View`
  /* justify-content: center; */
  background-color: white;
  flex-direction: column;
  margin: 0 24px 24px;
  padding: 0px;
  border-radius: 12px;
  ${Platform.select({
    android: css`
      elevation: 4;
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

const ModalFooter = styled.View`
  border-top-width: 1px;
  border-top-color: #eee;
  padding: 12px;
  ${Platform.select({
    ios: css`
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
    `,
    android: css`
      flex-direction: row;
      justify-content: flex-end;
    `
  })}
`;
