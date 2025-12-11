import { useCallback, useRef } from "react";
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

  // Use ref to avoid stale closure issues with disabled
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

  const animateIn = useCallback(() => {
    if (disabledRef.current) {
      return;
    }
    animatedValue.value = withTiming(1, { duration: duration[0], ...(easing ? { easing } : {}) });
  }, [animatedValue, duration, easing]);

  const animateOut = useCallback(() => {
    if (disabledRef.current) {
      return;
    }
    animatedValue.value = withTiming(0, { duration: duration[1], ...(easing ? { easing } : {}) });
  }, [animatedValue, duration, easing]);

  const animateTo = useCallback(
    (toValue: number, animateDuration: number) => {
      if (disabledRef.current) {
        return;
      }
      animatedValue.value = withTiming(toValue, { duration: animateDuration });
    },
    [animatedValue]
  );

  return {
    animatedValue,
    animateIn,
    animateOut,
    animateTo,
  };
};
