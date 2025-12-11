import { type ColorValue } from "react-native";
import { interpolateColor, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { isValidColorRange, type ColorRange } from "./useAnimatedColor";
import { useAnimatedTransition } from "./useAnimatedTransition";

export type AnimatedButtonConfig = {
  background?: ColorRange;
  disabledBackgroundColor?: ColorValue;
  border?: ColorRange;
  disabledBorderColor?: ColorValue;
  text?: ColorRange;
  disabledTextColor?: ColorValue;
  disabled?: boolean;
  inputRange?: readonly [number, number];
  duration?: readonly [number, number];
};

export const useAnimatedButton = ({
  background,
  border,
  text,
  disabledBackgroundColor,
  disabledBorderColor,
  disabledTextColor,
  disabled = false,
  inputRange = [0, 1],
  duration = [100, 300],
}: AnimatedButtonConfig) => {
  const isValid = isValidColorRange(background) || isValidColorRange(border) || isValidColorRange(text);

  // Use shared value so worklets can access current disabled state
  const isDisabled = useSharedValue(disabled);
  isDisabled.value = disabled;

  const { animatedValue, animateIn, animateOut } = useAnimatedTransition({
    duration,
    disabled: !isValid || disabled,
  });

  const backgroundColor = useDerivedValue(() => {
    if (isDisabled.value) {
      return disabledBackgroundColor;
    }
    if (!isValidColorRange(background)) {
      return background ? background[0] : undefined;
    }
    return interpolateColor(animatedValue.value, inputRange, background);
  });

  const borderColor = useDerivedValue(() => {
    if (isDisabled.value) {
      return disabledBorderColor;
    }
    if (!isValidColorRange(border)) {
      return border ? border[0] : undefined;
    }
    return interpolateColor(animatedValue.value, inputRange, border);
  });

  const textColor = useDerivedValue(() => {
    if (isDisabled.value) {
      return disabledTextColor;
    }
    if (!isValidColorRange(text)) {
      return text ? text[0] : undefined;
    }
    return interpolateColor(animatedValue.value, inputRange, text);
  });

  return {
    backgroundColor,
    borderColor,
    textColor,
    animateIn,
    animateOut,
  };
};
