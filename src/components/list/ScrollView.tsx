import React, { forwardRef, type FunctionComponent } from "react";
import { ScrollView as BaseScrollView, Platform, type ScrollViewProps } from "react-native";
import { useScrollViewStyles } from "src/hooks";

const DEFAULT_ADJUSTMENT_BEHAVIOR = Platform.OS === "ios" ? "automatic" : undefined;

export const ScrollView: FunctionComponent<ScrollViewProps> = forwardRef<BaseScrollView, ScrollViewProps>(
  function RenderScrollView(
    {
      showsVerticalScrollIndicator = false,
      contentInsetAdjustmentBehavior = DEFAULT_ADJUSTMENT_BEHAVIOR,
      contentContainerStyle,
      style,
      ...otherProps
    },
    ref,
  ) {
    const scrollViewStyles = useScrollViewStyles();

    return (
      <BaseScrollView
        style={[scrollViewStyles.style, style]}
        contentContainerStyle={[scrollViewStyles.contentContainerStyle, contentContainerStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
        overScrollMode="always"
        ref={ref}
        {...otherProps}
      />
    );
  },
);
