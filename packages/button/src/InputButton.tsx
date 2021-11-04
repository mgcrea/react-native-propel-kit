import React, {FunctionComponent} from 'react';
import {Platform, StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import {Pressable, PressableProps} from './Pressable';

export type InputButtonProps = Omit<TextInputProps, 'onPress'> & {
  onFocus: PressableProps['onPress'];
  viewStyle?: StyleProp<ViewStyle>;
  disabledViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
};

export const defaultProps = {
  placeholderTextColor: Platform.select({ios: '#c7c7cc', android: '#9e9e9e'})
};

export const InputButton: FunctionComponent<InputButtonProps> = ({
  editable = true,
  onFocus,
  placeholder,
  viewStyle,
  disabledViewStyle,
  textStyle,
  disabledTextStyle,
  placeholderTextColor = defaultProps.placeholderTextColor,
  value,
  ...otherPressableProps
}) => {
  return (
    <Pressable
      onPress={onFocus}
      title={value || placeholder || ''}
      disabled={!editable}
      viewStyle={[defaultStyles.view, viewStyle]}
      disabledViewStyle={[defaultStyles.disabledView, disabledViewStyle]}
      textStyle={[defaultStyles.text, textStyle]}
      disabledTextStyle={[defaultStyles.disabledText, disabledTextStyle]}
      color={!value ? placeholderTextColor : undefined}
      numberOfLines={1}
      {...otherPressableProps}
    />
  );
};

export const defaultStyles: {[s: string]: ViewStyle | TextStyle} = {
  view: Platform.select<ViewStyle>({
    ios: {justifyContent: 'flex-start', alignItems: 'center'},
    android: {justifyContent: 'flex-start', height: 50}
  })!,
  disabledView: Platform.select<ViewStyle>({
    ios: {},
    android: {}
  })!,
  text: Platform.select<TextStyle>({
    ios: {fontSize: 14, color: 'black'},
    android: {alignSelf: 'flex-start', paddingHorizontal: 3, paddingBottom: 2, color: '#212121'}
  })!,
  disabledText: Platform.select<TextStyle>({
    ios: {color: '#cdcdcd'},
    android: {color: '#cdcdcd'}
  })!
};
