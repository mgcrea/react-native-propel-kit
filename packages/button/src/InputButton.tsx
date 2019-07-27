import React, {FunctionComponent, useMemo} from 'react';
import {TextInputProps, StyleProp, ViewStyle, TextStyle, Platform, ButtonProps} from 'react-native';
import Button from './Button';

export type Props = Omit<TextInputProps, 'onPress'> & {
  onFocus: ButtonProps['onPress'];
  viewStyle?: StyleProp<ViewStyle>;
  disabledViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
};

export const defaultProps: Required<
  Omit<Props, keyof TextInputProps> & {
    style: Props['style'];
    placeholderTextColor: TextInputProps['placeholderTextColor'];
  }
> = {
  viewStyle: Platform.select({
    ios: {justifyContent: 'center'},
    android: {justifyContent: 'center', height: 50}
  }),
  disabledViewStyle: {},
  textStyle: Platform.select({
    ios: {},
    android: {paddingLeft: 3, paddingBottom: 2, color: '#212121'}
  }),
  disabledTextStyle: {},
  style: {},
  placeholderTextColor: Platform.select({ios: '#c7c7cc', android: '#9e9e9e'})
};

const InputButton: FunctionComponent<Props> = ({
  editable = true,
  onFocus,
  placeholder,
  viewStyle = defaultProps.viewStyle,
  disabledViewStyle = defaultProps.disabledViewStyle,
  textStyle = defaultProps.textStyle,
  disabledTextStyle = defaultProps.disabledTextStyle,
  style = defaultProps.style,
  placeholderTextColor = defaultProps.placeholderTextColor,
  value
}) => {
  return (
    <Button
      onPress={onFocus}
      title={value || placeholder || ''}
      disabled={!editable}
      viewStyle={viewStyle}
      disabledViewStyle={disabledViewStyle}
      textStyle={textStyle}
      disabledTextStyle={disabledTextStyle}
      style={style}
      color={!value ? placeholderTextColor : undefined}
    />
  );
};

export default InputButton;
