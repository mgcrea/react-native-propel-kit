---
id: select
title: Select
hide_title: true
---

# Select

The `<Select />`component gives your a easy-to-use cross platform select-like input leveraging this library [ModalDialog](./modal-dialog.md) and cross-platform [Picker](./picker.md) using an unified API.

- Can easily be built upon.
- Provides a simple API `{show, hide, toggle}` to control.

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/0wqZKk3.gif) | ![](https://i.imgur.com/olwO1Ey.gif) |

### Sources

You can check the <a href="https://github.com/mgcrea/react-native-propel-kit/blob/master/packages/select/src/Select.tsx" target="_blank">source code directly on GitHub</a>.

## Usage

### Setup dependencies

Since this components uses a backdrop, you need to wrap your application with a `<BackdropProvider />` component. You usually want to wrap it as high as possible in your tree so that the backdrop properly covers the whole screen.

```tsx
// App.jsx

import React from 'react';
import {BackdropProvider} from 'react-native-propel-kit';

const App: FunctionComponent = () => {
  return (
    <BackdropProvider>
      <RootNavigator />
    </BackdropProvider>
  );
};

export default App;
```

### Basic example

```tsx
// MyComponent.jsx

import React from 'react';
import {Button} from 'react-native';
import {ModalDialog, ModalDialogHandle} from 'react-native-propel-kit';

const MyComponent = () => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  return (
    <Select placeholder="Nationalité">
      {NATIONALITY_SELECT_ITEMS.map(({value, label}) => (
        <Select.Item key={value} value={value} label={label} />
      ))}
    </Select>
  );
};

export default MyComponent;
```

## Reference Handle

This component does forward the ref from its [ModalDialog](./modal-dialog.md).

```ts
export type Handle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
};
```

## Props

```ts
export type Props = Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> & {
  children?: ReactNode;
  initialValue?: SelectValue;
  InputButtonComponent?: ElementType<InputButtonProps>;
  onChange?: (value: SelectValue) => void;
  onEndEditing?: () => void;
  onSubmitEditing?: (value: SelectValue) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  value?: SelectValue;
  [s: string]: unknown; // unknown otherProps for InputButtonComponent
};
```

### Defaults

```ts
export const defaultProps = {
  InputButtonComponent: InputButton
};
```
