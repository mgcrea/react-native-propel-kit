import { type ColorValue } from "react-native";
import { interpolateColor, useDerivedValue } from "react-native-reanimated";
import { useAnimatedTransition } from "./useAnimatedTransition";

export type ColorRange = readonly [ColorValue | undefined, ColorValue | undefined];

export const isValidColorRange = (range: ColorRange | undefined): range is [string, string] => {
  "worklet";
  return range
    ? range[0] !== undefined &&
        typeof range[0] === "string" &&
        range[1] !== undefined &&
        typeof range[1] === "string"
    : false;
};

export type AnimatedColorConfig = {
  initialValue?: number;
  outputRange: ColorRange;
  inputRange?: readonly [number, number];
  duration?: readonly [number, number];
};

export const useAnimatedColor = ({
  initialValue = 0,
  outputRange,
  inputRange = [0, 1],
  duration = [100, 300],
}: AnimatedColorConfig) => {
  const disabled = !isValidColorRange(outputRange);

  const { animatedValue, animateIn, animateOut } = useAnimatedTransition({
    initialValue,
    duration,
  });

  const color = useDerivedValue(() => {
    if (disabled) {
      return outputRange[0];
    }
    return interpolateColor(animatedValue.value, inputRange, outputRange);
  });

  return {
    color,
    animateIn,
    animateOut,
  };
};
