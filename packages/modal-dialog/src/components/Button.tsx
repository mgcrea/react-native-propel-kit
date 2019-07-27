import React, {FunctionComponent} from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  Platform,
  View,
  ButtonProps,
  TouchableNativeFeedback,
  StyleProp,
  TextStyle
} from 'react-native';
import styled, {css} from 'styled-components/native';

export type Props = ButtonProps & {style?: StyleProp<TextStyle>; containerStyle?: StyleProp<ViewStyle>};

const Button: FunctionComponent<Props> = ({onPress, title, containerStyle, ...otherProps}) => {
  const formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title;
  return (
    <ButtonTouchable onPress={onPress}>
      <View style={containerStyle}>
        <ButtonText {...otherProps}>{formattedTitle}</ButtonText>
      </View>
    </ButtonTouchable>
  );
};

export default Button;

const ButtonTouchable = styled(Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity)`
  border-radius: 12px;
  overflow: hidden;
`;

const ButtonText = styled.Text`
  text-align: center;
  /* flex: 0 0 auto; */
  padding: 8px;
  ${Platform.select({
    ios: css`
      color: #007aff;
      font-size: 18px;
    `,
    android: css`
      color: #009688;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 600;
    `
  })};
`;
