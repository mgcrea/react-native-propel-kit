import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import type { StoreApi, UseBoundStore } from "zustand";
import type { NavigationStateType, NavigationStore } from "../stores";

export const createNavigationPersistence = (useNavigationStore: UseBoundStore<StoreApi<NavigationStore>>) => {
  return () => {
    const [isReady, setIsReady] = useState(Platform.OS === "web");
    const [initialState, setInitialState] = useState<NavigationStateType>();
    const setNavigationState = useNavigationStore((state) => state.setNavigationState);

    useEffect(() => {
      const restoreState = async () => {
        try {
          const initialUrl = await Linking.getInitialURL();
          if (initialUrl == null) {
            const savedState = useNavigationStore.getState().navigationState;
            if (savedState !== undefined) {
              setInitialState(savedState);
            }
          }
        } finally {
          setIsReady(true);
        }
      };

      if (!isReady) {
        void restoreState();
      }
    }, [isReady]);

    return {
      isReady,
      initialState,
      onStateChange: setNavigationState,
    };
  };
};
