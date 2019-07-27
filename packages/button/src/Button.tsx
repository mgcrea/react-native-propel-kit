// @see https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js
// @see https://github.com/react-native-training/react-native-elements/blob/next/src/buttons/Button.js

import React, {useCallback, FunctionComponent, useMemo, ElementType} from 'react';
import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ButtonProps,
  GestureResponderEvent,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  ActivityIndicator,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import pickTextStyles from './utils/pickTextStyles';

export type Props = ButtonProps & {
  loading?: boolean;
  loadingStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  disabledViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
  TouchableComponent?: ElementType<TouchableNativeFeedbackProps | TouchableOpacityProps>;
};

export const defaultProps: Required<Omit<Props, keyof ButtonProps>> = {
  loading: false,
  loadingStyle: Platform.select({
    ios: {marginRight: 8},
    android: {marginRight: 4}
  }),
  TouchableComponent: Platform.select<ElementType<TouchableNativeFeedbackProps | TouchableOpacityProps>>({
    android: TouchableNativeFeedback,
    default: TouchableOpacity
  }),
  viewStyle: Platform.select({
    ios: {justifyContent: 'center', flexDirection: 'row'},
    android: {justifyContent: 'center', flexDirection: 'row', height: 50}
  }),
  disabledViewStyle: Platform.select({
    ios: {},
    android: {}
  }),
  textStyle: Platform.select({
    ios: {fontSize: 18, color: '#007aff'},
    android: {paddingLeft: 3, paddingBottom: 2, color: '#212121'}
  }),
  disabledTextStyle: Platform.select({
    ios: {color: '#cdcdcd'},
    android: {color: '#cdcdcd'}
  }),
  style: {}
};

const Button: FunctionComponent<Props> = ({
  title,
  disabled,
  loading = defaultProps.loading,
  onPress,
  color,
  viewStyle: propViewStyle,
  loadingStyle: propLoadingStyle = defaultProps.loadingStyle,
  disabledViewStyle = defaultProps.disabledViewStyle,
  textStyle: propTextStyle = defaultProps.textStyle,
  disabledTextStyle = defaultProps.disabledTextStyle,
  style: propStyle = defaultProps.style,
  TouchableComponent = defaultProps.TouchableComponent
}) => {
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

  // @NOTE we use flatten to properly split text/view related styles
  const flattenStyle = useMemo<TextStyle>(() => StyleSheet.flatten(propStyle), [propStyle]);

  const viewStyle = useMemo<ViewStyle>(
    () => StyleSheet.flatten([propViewStyle, flattenStyle, disabled ? disabledViewStyle : null]),
    [propViewStyle, flattenStyle, disabled, disabledViewStyle]
  );

  const textStyle = useMemo<TextStyle>(
    () =>
      StyleSheet.flatten([
        propTextStyle,
        pickTextStyles(flattenStyle),
        color ? {color} : null,
        disabled ? disabledTextStyle : null
      ]),
    [propTextStyle, flattenStyle, disabled, color, disabledTextStyle]
  );

  return (
    <TouchableComponent disabled={disabled} onPress={handlePress}>
      <View style={viewStyle}>
        {loading ? <ActivityIndicator style={propLoadingStyle} color={textStyle.color} /> : null}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableComponent>
  );
};

export default Button;
