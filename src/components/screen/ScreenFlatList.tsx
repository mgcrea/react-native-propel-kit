import React from "react";
import { FlatList, Platform, type FlatListProps } from "react-native";
import { useSafePaddingTop } from "src/hooks";

const DEFAULT_ADJUSTMENT_BEHAVIOR = Platform.OS === "ios" ? "automatic" : undefined;

export type ScreenFlatListProps<T> = FlatListProps<T> & {
  className?: string;
  contentContainerClassName?: string;
  ListHeaderComponentClassName?: string;
  ListFooterComponentClassName?: string;
};

export const ScreenFlatList = <T,>({
  showsVerticalScrollIndicator = false,
  contentInsetAdjustmentBehavior = DEFAULT_ADJUSTMENT_BEHAVIOR,
  contentContainerStyle,
  style,
  ...otherProps
}: ScreenFlatListProps<T>) => {
  const safePaddingTop = useSafePaddingTop();
  const contentPaddingStyles = Platform.select({
    android: {
      paddingTop: safePaddingTop,
    },
    ios: {},
  });

  return (
    <FlatList<T>
      style={[{ flex: 1 }, style]}
      contentContainerStyle={[contentPaddingStyles, contentContainerStyle]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
      overScrollMode="always"
      {...otherProps}
    />
  );
};
ScreenFlatList.displayName = "ScreenFlatList";
