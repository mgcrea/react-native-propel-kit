import { useHeaderHeight } from "@react-navigation/elements";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafePaddingTop = (): number => {
  const inset = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  if (Platform.OS === "android" && headerHeight === 64) {
    // useHeaderHeight() includes inset.top once measured, but returns a
    // stale default on the first frame. Guarantee a stable minimum.
    return inset.top + 56;
  }

  return Math.max(inset.top, headerHeight);
};
