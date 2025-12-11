import {
  type EasingFunction,
  type EasingFunctionFactory,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type AnimatedTransitionConfig = {
  duration: readonly [number, number];
  initialValue?: number;
  easing?: EasingFunction | EasingFunctionFactory;
  disabled?: boolean;
};

export const useAnimatedTransition = ({
  duration,
  initialValue = 0,
  easing,
  disabled,
}: AnimatedTransitionConfig) => {
  const animatedValue = useSharedValue(initialValue);

  const animateIn = () => {
    if (disabled) {
      return;
    }
    animatedValue.value = withTiming(1, { duration: duration[0], ...(easing ? { easing } : {}) });
  };

  const animateOut = () => {
    if (disabled) {
      return;
    }
    animatedValue.value = withTiming(0, { duration: duration[1], ...(easing ? { easing } : {}) });
  };

  const animateTo = (toValue: number, duration: number) => {
    if (disabled) {
      return;
    }
    animatedValue.value = withTiming(toValue, { duration });
  };

  return {
    animatedValue,
    animateIn,
    animateOut,
    animateTo,
  };
};
