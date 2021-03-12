// @see https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js
// @see https://github.com/react-native-training/react-native-elements/blob/next/src/buttons/Button.js

import React, {ElementType, FunctionComponent, ReactNode, useCallback, useMemo} from 'react';
import {
  ButtonProps,
  GestureResponderEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from 'react-native';
import {pickTextStyles} from './utils';

export type PressableProps = ButtonProps & {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  disabledViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
  TouchableComponent?: ElementType<TouchableNativeFeedbackProps | TouchableOpacityProps>;
  activeOpacity?: TouchableOpacityProps['activeOpacity'];
  defaultStyles?: typeof defaultStyles;
};

export const defaultProps = {
  TouchableComponent: Platform.select<ElementType<TouchableNativeFeedbackProps | TouchableOpacityProps>>({
    android: TouchableNativeFeedback,
    default: TouchableOpacity
  })
};

export const Pressable: FunctionComponent<PressableProps> = ({
  children,
  title,
  disabled,
  onPress,
  color,
  viewStyle: propViewStyle,
  disabledViewStyle,
  textStyle: propTextStyle,
  disabledTextStyle,
  defaultStyles: propDefaultStyles = defaultStyles,
  style: propStyle,
  TouchableComponent = defaultProps.TouchableComponent,
  ...otherTouchableProps
}) => {
  // @NOTE we use flatten to properly split text/view related styles
  const flattenStyle = useMemo<TextStyle>(() => (propStyle ? StyleSheet.flatten(propStyle) : {}), [propStyle]);
  const doesFlex = flattenStyle.flex === 1;

  const handlePress = useCallback(
    (ev: GestureResponderEvent) => {
      if (disabled) {
        return;
      }
      if (onPress) {
        onPress(ev);
      }
    },
    [disabled, onPress]
  );

  const viewStyle = useMemo<ViewStyle>(
    () =>
      StyleSheet.flatten([propDefaultStyles.view, propViewStyle, flattenStyle, disabled ? disabledViewStyle : null]),
    [propDefaultStyles.view, propViewStyle, flattenStyle, disabled, disabledViewStyle]
  );

  const textStyle = useMemo<TextStyle>(
    () =>
      StyleSheet.flatten([
        propDefaultStyles.text,
        propTextStyle,
        pickTextStyles(flattenStyle),
        color ? {color} : null,
        disabled ? disabledTextStyle : null
      ]),
    [propDefaultStyles.text, propTextStyle, flattenStyle, disabled, color, disabledTextStyle]
  );

  return (
    <TouchableComponent
      style={{flex: doesFlex ? 1 : 0, flexDirection: 'row'}}
      disabled={disabled}
      onPress={handlePress}
      {...otherTouchableProps}>
      <View style={viewStyle}>
        {children}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableComponent>
  );
};

export const defaultStyles = {
  view: Platform.select<ViewStyle>({
    ios: {justifyContent: 'center', flexDirection: 'row', height: 50},
    android: {justifyContent: 'center', flexDirection: 'row', height: 50}
  }),
  disabledView: Platform.select<ViewStyle>({
    ios: {},
    android: {}
  }),
  text: Platform.select<TextStyle>({
    ios: {alignSelf: 'center', fontSize: 18, color: '#007aff'},
    android: {paddingHorizontal: 3, paddingBottom: 2, color: '#212121'}
  }),
  disabledText: Platform.select<TextStyle>({
    ios: {color: '#cdcdcd'},
    android: {color: '#cdcdcd'}
  })
};
