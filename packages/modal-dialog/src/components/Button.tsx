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
      <ButtonView style={containerStyle}>
        <ButtonText {...otherProps}>{formattedTitle}</ButtonText>
      </ButtonView>
    </ButtonTouchable>
  );
};

export default Button;

const ButtonTouchable = styled(Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity)`
  border-radius: 12px;
  overflow: hidden;
`;

const ButtonView = styled.View`
  ${Platform.select({
    ios: css`
      padding: 5px;
    `,
    android: css`
      margin: 0 6px;
      padding: 10px 12px;
      border-radius: 2px;
    `
  })}
`;

const ButtonText = styled.Text`
  ${Platform.select({
    ios: css`
      text-align: center;
      color: #007aff;
      font-size: 20px;
      /* font-weight: bold; */
    `,
    android: css`
      color: #009688;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: bold;
    `
  })};
`;
