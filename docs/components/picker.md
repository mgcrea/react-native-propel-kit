---
id: picker
title: Picker
hide_title: true
---

# Picker

The `<Picker />`component gives your a easy-to-use cross platform date picker leveraging a custom implementation on Android using a <a href="https://facebook.github.io/react-native/docs/flatlist" target="_blank">FlatList</a> and <a href="https://facebook.github.io/react-native/docs/datepickerios" target="_blank">PickerIOS</a> on iOS using an unified API based on the iOS implementation.

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/Xsa243E.gif) | ![](https://i.imgur.com/UhojPBz.gif) |

### Sources

You can check the <a href="https://github.com/mgcrea/react-native-propel-kit/blob/master/packages/picker/src/Picker.tsx" target="_blank">source code directly on GitHub</a>.

## Usage

### Basic example

```tsx
// MyComponent.jsx

import React from 'react';
import {Picker} from 'react-native-propel-kit';

const MyComponent = () => {
  const [value, setValue] = useState();
  // @NOTE we drop the second arg, to prevent setState warnings
  const handleValueChange = useCallback((nextValue: string) => {
    setValue(nextValue);
  }, []);
  return (
    <Picker selectedValue={value} onValueChange={handleValueChange} style={defaultStyle}>
      {NATIONALITY_SELECT_ITEMS.map(option => (
        <Picker.Item key={option.value} {...option} />
      ))}
    </Picker>
  );
};

export default MyComponent;
```

## Props

```ts
export type Props = PickerProps & {
  itemHeight?: number;
  itemVisibleCount?: number;
};
```

### Defaults

```ts
export const defaultProps = {
  itemHeight: 50,
  itemVisibleCount: 5.5
};
```
