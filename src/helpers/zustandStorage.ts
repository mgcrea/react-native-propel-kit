import { createMMKV } from "react-native-mmkv";
import superjson from "superjson";
import { type PersistStorage, type StorageValue } from "zustand/middleware";

export const storage = createMMKV({
  id: "mmkv.default",
  mode: "multi-process",
});

export const createZustandStorage = <S>(): PersistStorage<S> => ({
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
