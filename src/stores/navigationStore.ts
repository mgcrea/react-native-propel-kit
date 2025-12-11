import type { InitialState } from "@react-navigation/native";
import type { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createZustandStorage } from "../helpers/zustandStorage";

export type NavigationStateType = InitialState | undefined;

export type NavigationStore = {
  navigationState: NavigationStateType;
  setNavigationState: (state: NavigationStateType) => void;
  clearNavigationState: () => void;
};

export const createNavigationStore = (storage: MMKV) => {
  return create<NavigationStore>()(
    persist(
      (set) => ({
        navigationState: undefined,
        setNavigationState: (state: NavigationStateType) => set({ navigationState: state }),
        clearNavigationState: () => set({ navigationState: undefined }),
      }),
      {
        name: "navigation",
        storage: createZustandStorage<NavigationStore>(storage),
      },
    ),
  );
};
