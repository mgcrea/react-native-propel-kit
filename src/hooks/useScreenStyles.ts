import { tw } from "@mgcrea/react-native-tailwind";
import { useHeaderHeight } from "@react-navigation/elements";
import { useContext, useMemo } from "react";
import { Platform, type StyleProp, type ViewStyle } from "react-native";
import { BottomTabBarHeightContext } from "react-native-bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ScreenStylesVariant = "scrollview" | "flatlist" | "view";

export type ScreenStyles = {
  style: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const VARIANT_CONFIG = {
  scrollview: {
    style: tw`flex-1`,
    contentContainerStyle: tw`px-6 py-3`,
    paddingVertical: 12,
  },
  flatlist: {
    style: tw`flex-1`,
    contentContainerStyle: tw`px-6 py-2`,
    paddingVertical: 8,
  },
  view: {
    style: tw`flex-1`,
    contentContainerStyle: null,
    paddingVertical: 0,
  },
} as const;

export const useScreenStyles = (variant: ScreenStylesVariant): ScreenStyles => {
  const inset = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;

  return useMemo(() => {
    const config = VARIANT_CONFIG[variant];
    const safePaddingTop = Math.max(inset.top, headerHeight);
    if (variant === "view") {
      const paddingStyles = Platform.select({
        android: {
          paddingTop: safePaddingTop + config.paddingVertical,
          paddingBottom: config.paddingVertical,
        },
        ios: {
          paddingTop: safePaddingTop + config.paddingVertical,
          paddingBottom: config.paddingVertical + tabBarHeight,
        },
      });
      return {
        style: [config.style.style, paddingStyles],
      };
    }

    const paddingStyles = Platform.select({
      android: {
        paddingTop: safePaddingTop + config.paddingVertical,
        paddingBottom: config.paddingVertical,
      },
      ios: {
        paddingBottom: config.paddingVertical,
      },
    });

    return {
      style: config.style.style,
      contentContainerStyle: [config.contentContainerStyle?.style, paddingStyles],
    };
  }, [variant, inset.top, headerHeight, tabBarHeight]);
};

// Convenience hooks for backwards compatibility
export const useScrollViewStyles = (): ScreenStyles => useScreenStyles("scrollview");
export const useFlatListStyles = (): ScreenStyles => useScreenStyles("flatlist");
export const useViewStyles = (): ScreenStyles => useScreenStyles("view");
