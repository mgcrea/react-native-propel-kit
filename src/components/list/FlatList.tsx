import React from "react";
import { FlatList as BaseFlatList, Platform, type FlatListProps } from "react-native";
import { useFlatListStyles } from "src/hooks";

const DEFAULT_ADJUSTMENT_BEHAVIOR = Platform.OS === "ios" ? "automatic" : undefined;

export const FlatList = <T,>({
  showsVerticalScrollIndicator = false,
  contentInsetAdjustmentBehavior = DEFAULT_ADJUSTMENT_BEHAVIOR,
  contentContainerStyle,
  style,
  ...otherProps
}: FlatListProps<T>) => {
  const flatListStyles = useFlatListStyles();

  return (
    <BaseFlatList<T>
      style={[flatListStyles.style, style]}
      contentContainerStyle={[flatListStyles.contentContainerStyle, contentContainerStyle]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
      overScrollMode="always"
      {...otherProps}
    />
  );
};
