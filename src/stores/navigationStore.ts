import type { InitialState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createZustandStorage } from "../helpers/zustandStorage";

export type NavigationStateType = InitialState | undefined;

export type NavigationStore = {
  navigationState: NavigationStateType;
  setNavigationState: (state: NavigationStateType) => void;
  clearNavigationState: () => void;
};

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      navigationState: undefined,
      setNavigationState: (state: NavigationStateType) => set({ navigationState: state }),
      clearNavigationState: () => set({ navigationState: undefined }),
    }),
    {
      name: "navigation",
      storage: createZustandStorage<NavigationStore>(),
    },
  ),
);

export const useNavigationPersistence = () => {
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

export const clearNavigationState = () => {
  useNavigationStore.getState().clearNavigationState();
};
