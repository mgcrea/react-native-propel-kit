# React Native Propel Kit

A collection of screen components, animation hooks, and navigation utilities for React Native apps using React Navigation and Reanimated.

## Install

```sh
pnpm add @mgcrea/react-native-propel-kit
```

### Peer Dependencies

This library requires the following peer dependencies:

```sh
pnpm add react-native-reanimated react-native-safe-area-context react-native-mmkv react-native-bottom-tabs @react-navigation/native @react-navigation/elements zustand superjson
```

## Components

### `Screen`

A base screen wrapper that handles safe area padding and bottom tab bar insets.

```tsx
import { Screen } from "@mgcrea/react-native-propel-kit";

<Screen style={{ backgroundColor: "white" }}>
  <Text>Content with proper safe area handling</Text>
</Screen>
```

### `ScreenScrollView`

A `ScrollView`-based screen with safe area padding, automatic content inset adjustment on iOS, and ref forwarding.

```tsx
import { ScreenScrollView } from "@mgcrea/react-native-propel-kit";

<ScreenScrollView contentContainerStyle={{ padding: 16 }}>
  <Text>Scrollable content</Text>
</ScreenScrollView>
```

### `ScreenFlatList`

A `FlatList`-based screen with safe area padding and automatic content inset adjustment on iOS.

```tsx
import { ScreenFlatList } from "@mgcrea/react-native-propel-kit";

<ScreenFlatList data={items} renderItem={({ item }) => <ItemRow item={item} />} />
```

## Hooks

### `useAnimatedTransition`

Drives a Reanimated shared value between 0 and 1 with configurable durations and easing.

```tsx
const { animatedValue, animateIn, animateOut } = useAnimatedTransition({
  duration: [150, 300],
});
```

### `useAnimatedColor`

Interpolates a color between two values using `useAnimatedTransition` under the hood.

```tsx
const { color, animateIn, animateOut } = useAnimatedColor({
  outputRange: ["#ffffff", "#000000"],
});
```

### `useAnimatedButton`

Manages animated color transitions for button states (background, border, text, text border) with disabled state support.

```tsx
const { backgroundColor, textColor, animateIn, animateOut } = useAnimatedButton({
  background: ["#3b82f6", "#2563eb"],
  text: ["#ffffff", "#ffffff"],
  disabled: false,
});
```

### `useNavigationReady`

Tracks when the navigation container is ready, returning a boolean state and a callback for the `onReady` prop.

```tsx
const { isNavigationReady, onNavigationReady } = useNavigationReady();

<NavigationContainer onReady={onNavigationReady}>
  {/* ... */}
</NavigationContainer>
```

### `useOnceReady`

Executes a callback once when a condition becomes true, with an optional minimum delay since mount.

```tsx
useOnceReady(isNavigationReady && !isLoading, () => {
  navigationRef.dispatch(StackActions.replace("Home"));
}, { minDelay: 500 });
```

### `useNavigationPersistence`

Factory that creates a hook for persisting and restoring React Navigation state using a Zustand store backed by MMKV.

```tsx
import { createNavigationStore, createNavigationPersistence } from "@mgcrea/react-native-propel-kit";

const useNavigationStore = createNavigationStore(mmkvStorage);
const useNavigationPersistence = createNavigationPersistence(useNavigationStore);

function App() {
  const { isReady, initialState, onStateChange } = useNavigationPersistence();

  if (!isReady) return null;

  return (
    <NavigationContainer initialState={initialState} onStateChange={onStateChange}>
      {/* ... */}
    </NavigationContainer>
  );
}
```

### `useSafePaddingTop`

Computes a safe top padding value from the header height and safe area insets, with a workaround for stale header height defaults on Android.

## Helpers

### `createZustandStorage`

Creates a Zustand-compatible `PersistStorage` adapter backed by MMKV, using SuperJSON for serialization.

```tsx
import { createZustandStorage } from "@mgcrea/react-native-propel-kit";

const storage = createZustandStorage(mmkvInstance);
```

## License

MIT - [Olivier Louvignes](https://github.com/mgcrea)
