---
id: customizing-styles
title: Customizing styles
hide_title: true
sidebar_label: Customizing styles
---

# Customizing styles

React Native Propel Kit has been built from the ground up to be extendable.

## Objectives

- Be able to easily override a component styles globally
- Be able to easily extend a specific style via passing props
- Be able to build upon these components while guarding against upstream style changes

## Guides

### Globally override styles

Every component that uses styles do export a `defaultStyles` object that is statically used to set default styles.

You can easily override/customize these styles using basic `Object.assign` operations.

For instance, here is the actual configuration of our sandbox <a href="https://github.com/mgcrea/react-native-propel-kit/tree/master/examples" target="_blank">examples app</a>:

```ts
import {StyleSheet} from 'react-native';
import {buttonDefaultStyles, inputButtonDefaultStyles} from 'react-native-propel-kit';

Object.assign(buttonDefaultStyles, {
  view: {
    ...buttonDefaultStyles.view,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 4,
    minWidth: 200
  },
  text: {
    color: 'black',
    padding: 12,
    fontSize: 18
  }
});

Object.assign(inputButtonDefaultStyles, {
  view: {
    ...inputButtonDefaultStyles.view,
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 4,
    elevation: 4,
    minWidth: 200,
    borderColor: '#C5CAE9',
    borderWidth: StyleSheet.hairlineWidth
  },
  text: {
    color: 'black',
    padding: 12,
    fontSize: 18
  }
});
```

### Locally extend styles

For every default style, you can also pass the associated prop to locally extend these defaults.

For instance if we check the [`<Select />`](./../components/select.md) props you can find a lot of `xxxStyle` props:

```ts
export type Props = {
  // [...]
  defaultStyles?: typeof defaultStyles;
  cancelStyle?: StyleProp<TextStyle>;
  confirmStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
};
```

Just use them locally to extend the styles:

```tsx
// MyComponent.jsx

import React from 'react';
import {Button} from 'react-native';
import {ModalDialog, ModalDialogHandle} from 'react-native-propel-kit';

const MyComponent = () => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  return (
    <Select headerStyle={{marginBottom: 32}} titleStyle={{fontSize: 32}}>
      <SelectItem label="Java" value="java" />
      <SelectItem label="JavaScript" value="js" />
    </Select>
  );
};

export default MyComponent;
```

### Fork away styles

Let's say you want to use the awesome [`<ModalDialog />`](./../components/modal-dialog.md) to build an `<ActionSheet />` component.

You want to make sure that any future change to the base `<ModalDialog />` `defaultStyles` won't break your higher level compoennt silently.

That's why every component that uses `defaultStyles` do also accept prop with this same name that will replace every style defaults.

```ts
export type Props = {
  // [...]
  defaultStyles?: typeof defaultStyles;
};
```

In fact the actual `<ActionSheet />` <a href="https://github.com/mgcrea/react-native-propel-kit/blob/master/packages/action-sheet-provider/src/ActionSheet.tsx#L72" target="_blank">source code</a> used by [`<ActionSheetProvider />`](./../components/action-sheet-provider.md) works just like this.
