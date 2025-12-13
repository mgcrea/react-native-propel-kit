import React, { use, type FunctionComponent, type PropsWithChildren } from "react";
import { Platform, View, type ViewProps } from "react-native";
import { BottomTabBarHeightContext } from "react-native-bottom-tabs";
import { useSafePaddingTop } from "src/hooks";

export type ScreenProps = ViewProps;

export const Screen: FunctionComponent<PropsWithChildren<ScreenProps>> = ({
  style,
  children,
  ...otherProps
}) => {
  const safePaddingTop = useSafePaddingTop();
  const tabBarHeight = use(BottomTabBarHeightContext) ?? 0;

  const paddingStyles = Platform.select({
    android: {
      paddingTop: safePaddingTop,
    },
    ios: {
      paddingTop: safePaddingTop,
      paddingBottom: tabBarHeight,
    },
  });

  return (
    <View style={[{ flex: 1, ...paddingStyles }, style]} {...otherProps}>
      {children}
    </View>
  );
};
Screen.displayName = "Screen";
