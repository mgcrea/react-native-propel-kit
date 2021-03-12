import React, {FunctionComponent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Easing, EasingFunction, Platform, StyleSheet} from 'react-native';
const IOS_OPACITY = 0.4; // @NOTE from native ActionSheet backdrop

export type BackdropContextValue = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

// @ts-expect-error allow initial null
export const BackdropContext = React.createContext<BackdropContextValue>(null);

export type BackdropProviderProps = {
  backgroundColor?: string;
  duration?: number;
  easing?: EasingFunction;
  opacity?: number;
  useNativeDriver?: boolean;
  zIndex?: number;
};

export const defaultProps: Required<BackdropProviderProps> = {
  backgroundColor: 'black',
  duration: 300,
  easing: Easing.inOut(Easing.ease),
  opacity: IOS_OPACITY,
  useNativeDriver: true,
  zIndex: 99
};

export const BackdropProvider: FunctionComponent<BackdropProviderProps> = ({
  backgroundColor = 'black',
  children,
  duration = defaultProps.duration,
  easing = defaultProps.easing,
  opacity = defaultProps.opacity,
  useNativeDriver = defaultProps.useNativeDriver,
  zIndex = defaultProps.zIndex
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [displayStyle, setDisplayStyle] = useState<'flex' | 'none'>('flex');
  const latestIsVisible = useRef<boolean>(isVisible);

  // Show backdrop
  const show = useCallback(() => {
    setIsVisible(true);
    setDisplayStyle('flex');
  }, []);

  // Hide backdrop
  const hide = useCallback(() => {
    setIsVisible(false);
    latestIsVisible.current = false;
  }, []);

  // Track isVisible latest value with a ref
  useEffect(() => {
    latestIsVisible.current = isVisible;
  }, [isVisible]);

  // Toggle backdrop
  // @NOTE a ref is used to provide a stable context accross renders
  const toggle = useCallback(() => {
    !latestIsVisible.current ? show() : hide();
  }, [latestIsVisible, show, hide]);

  // Expose API via context
  const contextValue = useMemo<BackdropContextValue>(() => {
    return {show, hide, toggle};
  }, [show, hide, toggle]);

  // Animate backdrop opacity along "isVisible" prop
  const {current: animatedOpacity} = useRef(new Animated.Value(0));
  useEffect(() => {
    const animation = Animated.timing(animatedOpacity, {
      duration: isVisible ? duration : 200,
      easing,
      toValue: isVisible ? opacity : 0,
      useNativeDriver
    });
    animation.start(() => {
      setDisplayStyle(isVisible ? 'flex' : 'none');
    });
    return () => animation.stop();
  }, [isVisible, duration, easing, opacity, animatedOpacity, useNativeDriver]);

  return (
    <BackdropContext.Provider value={contextValue}>
      {children}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          // @NOTE hack around bug https://github.com/facebook/react-native/issues/18415
          Platform.select({
            android: {
              position: displayStyle === 'none' ? 'relative' : 'absolute'
            }
          }),
          {display: displayStyle, zIndex, backgroundColor, opacity: animatedOpacity}
        ]}
      />
    </BackdropContext.Provider>
  );
};

export default BackdropProvider;
