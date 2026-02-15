import React, { forwardRef, type FunctionComponent } from "react";
import { Platform, ScrollView, type ScrollViewProps } from "react-native";
import { useSafePaddingTop } from "src/hooks";

const DEFAULT_ADJUSTMENT_BEHAVIOR = Platform.OS === "ios" ? "automatic" : undefined;

export type ScreenScrollViewProps = ScrollViewProps & {
  className?: string;
  contentContainerClassName?: string;
};

export const ScreenScrollView: FunctionComponent<ScreenScrollViewProps> = forwardRef<
  ScrollView,
  ScreenScrollViewProps
>(function ScreenScrollViewRender(
  {
    showsVerticalScrollIndicator = false,
    contentInsetAdjustmentBehavior = DEFAULT_ADJUSTMENT_BEHAVIOR,
    contentContainerStyle,
    style,
    ...otherProps
  },
  ref,
) {
  const safePaddingTop = useSafePaddingTop();
  const contentPaddingStyles = Platform.select({
    android: {
      paddingTop: safePaddingTop,
    },
    ios: {},
  });

  return (
    <ScrollView
      style={[{ flex: 1 }, style]}
      contentContainerStyle={[contentPaddingStyles, contentContainerStyle]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
      overScrollMode="always"
      ref={ref}
      {...otherProps}
    />
  );
});
