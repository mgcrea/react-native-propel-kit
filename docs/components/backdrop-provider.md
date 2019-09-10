---
id: backdrop-provider
title: BackdropProvider
hide_title: true
---

# Backdrop Provider

This component is a <a href="https://reactjs.org/docs/context.html#contextprovider" target="_blank">Context Provider</a> that enables the usage of a cross-platform backdrop component anywhere in your application.

- Can be easily re-used by any other component that requires a backdrop

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/Nv7bSi7.gif) | ![](https://i.imgur.com/zxBdIUJ.gif) |

## Usage

### Required setup

First you need to wrap your application with a `<BackdropProvider />` component. You usually want to wrap it as high as possible in your tree so that the backdrop properly covers the whole screen.

```jsx
// App.jsx

import React, {FunctionComponent} from 'react';
import BackdropProvider from '@mgcrea/react-native-backdrop-provider';

const App: FunctionComponent = () => {
  return (
    <BackdropProvider>
      <RootNavigator />
    </BackdropProvider>
  );
};

export default App;
```

### Usage with context

Then, the easiest way to use the backdrop in a component is to use react [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) hook

```jsx
// MyComponent.jsx

import React, {FunctionComponent} from 'react';
import {Button} from 'react-native';
import {BackdropContext} from '@mgcrea/react-native-backdrop-provider';

const MyComponent: FunctionComponent = () => {
  const backdrop = useContext(BackdropContext);
  const handlePress = useCallback(() => {
    backdrop.show();
  }, [backdrop]);
  return <Button onPress={handlePress} title="Show Backdrop" />;
};

export default MyComponent;
```

### Usage with consumer

An alternative way to use the backdrop is to use the `<BackdropContext.Consumer />` component as a higher order component providing the backdrop context API.

```jsx
// MyComponent.jsx

import React, {FunctionComponent} from 'react';
import {Button} from 'react-native';
import {BackdropContext} from '@mgcrea/react-native-backdrop-provider';

const MyComponent: FunctionComponent = () => {
  return (
    <BackdropContext.Consumer>
      {backdrop => (
        <Button
          onPress={() => {
            backdrop.show();
          }}
          title="Open"
        />
      )}
    </BackdropContext.Consumer>
  );
};

export default MyComponent;
```

## Props

```ts
type BackdropProps = {
  backgroundColor?: string;
  children?: ReactNode;
  duration?: number;
  easing?: EasingFunction;
  opacity?: number;
  useNativeDriver?: boolean;
  zIndex?: number;
};
```

### Defaults

```ts
const defaultProps = {
  backgroundColor: 'black',
  duration: 300,
  easing: Easing.inOut(Easing.ease),
  opacity: 0.4,
  useNativeDriver: true,
  zIndex: 99
};
```
