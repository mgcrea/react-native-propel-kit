import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafePaddingTop = (): number => {
  const inset = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  return Math.max(inset.top, headerHeight);
};
