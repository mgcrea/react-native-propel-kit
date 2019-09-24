---
id: modal-dialog
title: ModalDialog
hide_title: true
---

# ModalDialog

The `<ModalDialog />`component gives your a easy-to-use cross platform modal dialog that tries to blend in as much as possible in the respective platforms. It is the basic block behind most other modal components (eg. `<ActionSheet />`, `<DatePicker />`, `<Select />`, etc.).

- Can easily be built upon.
- Provides a simple API `{show, hide, toggle}` to control.

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/2K1BMFb.gif) | ![](https://i.imgur.com/wK1AaCX.gif) |

### Sources

You can check the <a href="https://github.com/mgcrea/react-native-propel-kit/blob/master/packages/modal-dialog/src/ModalDialog.tsx" target="_blank">source code directly on GitHub</a>.

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
    <View>
      <Button
        onPress={() => {
          if (modalDialogRef.current) {
            modalDialogRef.current.show();
          }
        }}
        title="Open"
      />
      <ModalDialog
        title="Some Title"
        message="Some long message"
        ref={modalDialogRef}
        onCancel={() => {}}
        onConfirm={() => {}}>
        <Text
          style={{
            fontSize: 32,
            paddingVertical: 44,
            textAlign: 'center',
            alignSelf: 'stretch'
          }}>
          Hello World
        </Text>
      </ModalDialog>
    </View>
  );
};

export default MyComponent;
```

## Handle

```ts
export type Handle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
};
```

## Props

```ts
export type Props = ModalProps & {
  defaultStyles?: typeof defaultStyles;
  backgroundColor?: string;
  cancelTitle?: string;
  cancelStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  confirmTitle?: string;
  confirmStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  message?: string;
  messageStyle?: StyleProp<TextStyle>;
  delay?: number;
  initialVisible?: boolean;
};
```

### Defaults

```ts
export const defaultProps = {
  backgroundColor: 'white',
  animationType: Platform.select<ModalProps['animationType']>({android: 'fade', ios: 'slide'}),
  cancelTitle: 'Cancel',
  confirmTitle: Platform.select<string>({android: 'OK', ios: 'Confirm'}),
  transparent: true
};
```

## Styles

### Defaults

```ts
export const defaultStyles = {
  modal: Platform.select<ViewStyle>({
    ios: {flex: 1, justifyContent: 'flex-end'},
    android: {flex: 1, justifyContent: 'center'}
  }),
  container: Platform.select<ViewStyle>({
    ios: {
      flexDirection: 'column',
      alignItems: 'stretch',
      // marginHorizontal: 8, // actionsheet
      marginHorizontal: 24,
      marginBottom: 24,
      maxHeight: MAX_HEIGHT - 8
    },
    android: {
      flexDirection: 'column',
      alignItems: 'stretch',
      // marginHorizontal: 82, // timepicker/spinner
      marginHorizontal: 24,
      elevation: 4,
      maxHeight: MAX_HEIGHT - 8
    }
  }),
  header: Platform.select<ViewStyle>({
    ios: {alignItems: 'center', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12},
    android: {alignItems: 'flex-start', padding: 16}
  }),
  body: Platform.select<ViewStyle>({
    ios: {
      flexShrink: 1,
      flexDirection: 'column'
    },
    android: {
      flexShrink: 1,
      flexDirection: 'column'
    }
  }),
  footer: Platform.select<TextStyle>({
    ios: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12
    },
    android: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      padding: 8
    }
  }),
  title: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 14, fontWeight: '500', textAlign: 'center', color: '#888'},
    android: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'left',
      color: '#333'
    }
  }),
  message: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 13, fontWeight: '400', textAlign: 'center', color: '#888'},
    android: {paddingVertical: 6, paddingHorizontal: 12, fontSize: 18, fontWeight: '400', color: '#666'}
  }),
  cancel: Platform.select<TextStyle>({
    ios: {marginTop: 24, borderRadius: 12, fontWeight: '600'},
    android: {}
  }),
  confirm: Platform.select<TextStyle>({
    ios: {borderBottomLeftRadius: 12, borderBottomRightRadius: 12, fontWeight: '400'},
    android: {}
  })
};
```
