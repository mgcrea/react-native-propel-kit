---
id: action-sheet-provider
title: ActionSheetProvider
hide_title: true
---

# ActionSheet Provider

<a href="https://reactjs.org/docs/context.html#contextprovider" target="_blank">Context Provider</a> that enables the usage of a cross-platform ActionSheet component anywhere in your application.

- On iOS, defaults to the native <a href="https://facebook.github.io/react-native/docs/actionsheetios.html">ActionSheetIOS</a>, but you can opt-in for a software pixel perfect implementation if you need more customization.

- On android, uses a custom software implementation that aims to blend nicely with the OS interface.

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/Nv7bSi7.gif) | ![](https://i.imgur.com/zxBdIUJ.gif) |

## Usage

### Required setup

Since this component requires a backdrop, you also need to wrap your application with a `<BackdropProvider />` component. You usually want to wrap it as high as possible in your tree so that the backdrop properly covers the whole screen.

```tsx
// App.jsx

import React from 'react';
import ActionSheetProvider, {BackdropProvider} from '@mgcrea/react-native-backdrop-provider';

const App: FunctionComponent = () => {
  return (
    <BackdropProvider>
      <ActionSheetProvider>
        <RootNavigator />
      </ActionSheetProvider>
    </BackdropProvider>
  );
};

export default App;
```

### Usage with context

Easiest way to use the backdrop in a component is to use react [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) hook

```jsx
// MyComponent.jsx

import React, {FunctionComponent} from 'react';
import {Button} from 'react-native';
import {ActionSheetContext} from '@mgcrea/react-native-action-sheet-provider';

const MyComponent: FunctionComponent = () => {
  const actionSheet = useContext(ActionSheetContext);
  const handlePress = useCallback(() => {
    actionSheet.showWithOptions(
      {
        title: 'Are you sure?',
        message: 'Please confirm the removal',
        options: ['Cancel', 'Remove'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        console.warn('onButtonPress', {buttonIndex});
      }
    );
  }, [actionSheet]);
  return <Button onPress={handlePress} title="Show ActionSheet" />;
};

export default MyComponent;
```

### Usage with consumer

An alternative way to use the backdrop is to use the `<ActionSheetContext.Consumer />` component as a higher order component providing the `actionSheet` context API.

```jsx
// MyComponent.jsx

import React, {FunctionComponent} from 'react';
import {Button} from 'react-native';
import {ActionSheetContext} from '@mgcrea/react-native-action-sheet-provider';

const MyComponent: FunctionComponent = () => {
  return (
    <ActionSheetContext.Consumer>
      {actionSheet => (
        <Button
          onPress={() => {
            actionSheet.showWithOptions(
              {
                title: 'Are you sure?',
                message: 'Please confirm the removal',
                options: ['Cancel', 'Remove'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0
              },
              buttonIndex => {
                console.warn('onButtonPress', {buttonIndex});
              }
            );
          }}
          title="Open"
        />
      )}
    </ActionSheetContext.Consumer>
  );
};

export default MyComponent;
```

## Props

### ActionSheet

```ts
export type ActionSheetProps = Pick<ScrollViewProps, 'scrollEnabled'> &
  Omit<ModalDialogProps, 'onConfirm' | 'confirmTitle' | 'confirmStyle'> &
  ActionSheetIOSOptions & {
    optionStyle?: StyleProp<TextStyle>;
    lastOptionExtraStyle?: StyleProp<TextStyle>;
    destructiveButtonColor?: string;
    onButtonPress: (buttonIndex: number) => void;
    onCancel: () => void;
  };
```

### ActionSheetProvider

```ts
type ActionSheetProviderProps = ActionSheetProps & {
  native?: boolean;
};
```

### Defaults

```ts
const defaultProps = {
  backgroundColor: 'white',
  cancelTitle: 'Cancel',
  destructiveButtonColor: Platform.select({
    ios: '#ff3b30', // iOS.systemRed (@see https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)
    android: '#f44336' // android.red500 (@see https://material.io/design/color/the-color-system.html)
  }),
  containerStyle: Platform.select<ViewStyle>({
    ios: {margin: 8, maxHeight: MAX_HEIGHT - 8 * 2},
    android: {
      flexDirection: 'column',
      alignItems: 'stretch',
      // marginHorizontal: 82, // timepicker/spinner
      margin: 24,
      maxHeight: MAX_HEIGHT - 24 * 2,
      elevation: 4
    }
  }),
  headerStyle: Platform.select<ViewStyle>({
    ios: {alignItems: 'center', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, opacity: 0.94},
    android: {alignItems: 'flex-start', paddingVertical: 24, paddingHorizontal: 32}
  }),
  bodyStyle: Platform.select<ViewStyle>({
    default: {
      flexShrink: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      opacity: 0.94
    },
    android: {
      flexShrink: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent'
    }
  }),
  footerStyle: Platform.select<TextStyle>({
    ios: {flex: 0, backgroundColor: 'transparent', borderRadius: 12},
    android: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      padding: 8
    }
  }),
  titleStyle: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 14, fontWeight: '500', textAlign: 'center', color: '#888'},
    android: {
      paddingBottom: 12,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'left',
      color: '#333'
    }
  }),
  messageStyle: Platform.select<TextStyle>({
    ios: {paddingBottom: 12, fontSize: 13, fontWeight: '400', textAlign: 'center', color: '#888'},
    android: {paddingBottom: 12, fontSize: 18, fontWeight: '400', color: '#666'}
  }),
  cancelStyle: Platform.select<TextStyle>({
    ios: {marginTop: 8, borderRadius: 12, fontWeight: '600'},
    android: {}
  }),
  optionStyle: Platform.select<TextStyle>({
    ios: {
      marginTop: StyleSheet.hairlineWidth
    },
    android: {
      marginTop: StyleSheet.hairlineWidth
    }
  }),
  lastOptionExtraStyle: Platform.select<TextStyle>({
    ios: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12
    },
    android: {
      marginBottom: StyleSheet.hairlineWidth
    }
  })
};
```
