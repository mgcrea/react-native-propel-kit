import { type ColorValue } from "react-native";
import { interpolateColor, useDerivedValue } from "react-native-reanimated";
import { isValidColorRange, type ColorRange } from "./useAnimatedColor";
import { useAnimatedTransition } from "./useAnimatedTransition";

export type AnimatedButtonConfig = {
  background?: ColorRange;
  disabledBackgroundColor?: ColorValue;
  border?: ColorRange;
  disabledBorderColor?: ColorValue;
  text?: ColorRange;
  disabledTextColor?: ColorValue;
  textBorder?: ColorRange;
  disabledTextBorderColor?: ColorValue;
  disabled?: boolean;
  inputRange?: readonly [number, number];
  duration?: readonly [number, number];
};

export const useAnimatedButton = ({
  background,
  border,
  text,
  textBorder,
  disabledBackgroundColor,
  disabledBorderColor,
  disabledTextColor,
  disabledTextBorderColor,
  disabled,
  inputRange = [0, 1],
  duration = [100, 300],
}: AnimatedButtonConfig) => {
  const isValid = isValidColorRange(background) || isValidColorRange(border) || isValidColorRange(text);

  const { animatedValue, animateIn, animateOut } = useAnimatedTransition({
    duration,
    disabled: !isValid || disabled,
  });

  const backgroundColor = useDerivedValue(() => {
    if (disabled) {
      return disabledBackgroundColor;
    }
    if (!isValidColorRange(background)) {
      return background ? background[0] : undefined;
    }
    return interpolateColor(animatedValue.value, inputRange, background);
  });

  const borderColor = useDerivedValue(() => {
    if (disabled) {
      return disabledBorderColor;
    }
    if (!isValidColorRange(border)) {
      return border ? border[0] : undefined;
    }
    return interpolateColor(animatedValue.value, inputRange, border);
  });

  const textColor = useDerivedValue(() => {
    if (disabled) {
      return disabledTextColor;
    }
    if (!isValidColorRange(text)) {
      return text ? text[0] : undefined;
    }
    return interpolateColor(animatedValue.value, inputRange, text);
  });

  const textBorderColor = useDerivedValue(() => {
    if (disabled) {
      return disabledTextBorderColor;
    }
    if (!isValidColorRange(textBorder)) {
      return textBorder ? textBorder[0] : undefined;
    }
    return interpolateColor(animatedValue.value, inputRange, textBorder);
  });

  return {
    backgroundColor,
    borderColor,
    textColor,
    textBorderColor,
    animateIn,
    animateOut,
  };
};
