import React, {FunctionComponent} from 'react';
import {TextInputProps, StyleProp, ViewStyle, TextStyle, Platform} from 'react-native';
import Pressable, {Props as PressableProps} from './Pressable';

export type Props = Omit<TextInputProps, 'onPress'> & {
  onFocus: PressableProps['onPress'];
  viewStyle?: StyleProp<ViewStyle>;
  disabledViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
};

export const defaultProps = {
  placeholderTextColor: Platform.select({ios: '#c7c7cc', android: '#9e9e9e'})
};

const InputButton: FunctionComponent<Props> = ({
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
      {...otherPressableProps}
    />
  );
};

export default InputButton;

export const defaultStyles: {[s: string]: ViewStyle | TextStyle} = {
  view: Platform.select<ViewStyle>({
    ios: {justifyContent: 'flex-start'},
    android: {justifyContent: 'flex-start', height: 50}
  }),
  disabledView: Platform.select<ViewStyle>({
    ios: {},
    android: {}
  }),
  text: Platform.select<TextStyle>({
    ios: {alignSelf: 'flex-start', fontSize: 18, color: '#007aff'},
    android: {paddingHorizontal: 3, paddingBottom: 2, color: '#212121'}
  }),
  disabledText: Platform.select<TextStyle>({
    ios: {color: '#cdcdcd'},
    android: {color: '#cdcdcd'}
  })
};
