import type { MMKV } from "react-native-mmkv";
import superjson from "superjson";
import { type PersistStorage, type StorageValue } from "zustand/middleware";

export const createZustandStorage = <S>(storage: MMKV): PersistStorage<S> => ({
  setItem: (name: string, value) => {
    storage.set(name, superjson.stringify(value));
  },
  getItem: (name: string) => {
    const value = storage.getString(name);
    if (!value) {
      return null;
    }
    try {
      return superjson.parse<StorageValue<S>>(value);
    } catch {
      storage.remove(name);
      return null;
    }
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
});
