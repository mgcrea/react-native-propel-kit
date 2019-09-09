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
  activeOpacity?: TouchableOpacityProps['activeOpacity'];
};

export const defaultProps = {
  TouchableComponent: Platform.select<ElementType<TouchableNativeFeedbackProps | TouchableOpacityProps>>({
    android: TouchableNativeFeedback,
    default: TouchableOpacity
  })
};

const Button: FunctionComponent<Props> = ({
  title,
  disabled: propDisabled,
  loading: propLoading,
  onPress,
  color,
  viewStyle: propViewStyle,
  loadingStyle: propLoadingStyle,
  disabledViewStyle,
  textStyle: propTextStyle,
  disabledTextStyle,
  style: propStyle = defaultProps.style,
  TouchableComponent = defaultProps.TouchableComponent,
  ...otherTouchableProps
}) => {
  // @NOTE we use flatten to properly split text/view related styles
  const flattenStyle = useMemo<TextStyle>(() => (propStyle ? StyleSheet.flatten(propStyle) : {}), [propStyle]);
  const doesFlex = flattenStyle.flex === 1;
  const disabled = propDisabled || propLoading;

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
    () => StyleSheet.flatten([defaultStyles.view, propViewStyle, flattenStyle, disabled ? disabledViewStyle : null]),
    [propViewStyle, flattenStyle, disabled, disabledViewStyle]
  );

  const textStyle = useMemo<TextStyle>(
    () =>
      StyleSheet.flatten([
        defaultStyles.text,
        propTextStyle,
        pickTextStyles(flattenStyle),
        color ? {color} : null,
        disabled ? disabledTextStyle : null
      ]),
    [propTextStyle, flattenStyle, disabled, color, disabledTextStyle]
  );

  return (
    <TouchableComponent
      style={{flex: doesFlex ? 1 : 0, flexDirection: 'row'}}
      disabled={disabled}
      onPress={handlePress}
      {...otherTouchableProps}>
      <View style={viewStyle}>
        {propLoading ? (
          <ActivityIndicator
            style={[defaultStyles.loading, propLoadingStyle]}
            color={textStyle && textStyle.color ? textStyle.color : defaultStyles.text.color}
          />
        ) : null}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableComponent>
  );
};

export default Button;

export const defaultStyles: {[s: string]: ViewStyle | TextStyle} = {
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
  }),
  loading: Platform.select<ViewStyle>({
    ios: {
      position: 'absolute',
      backgroundColor: 'black',
      opacity: 0.5,
      height: 40,
      width: 40,
      marginRight: 8,
      alignSelf: 'center',
      borderRadius: 12
    },
    android: {marginRight: 4}
  })
};
