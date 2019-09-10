---
id: time-picker
title: TimePicker
hide_title: true
---

# TimePicker

Components that gives your a easy-to-use cross platform TimePicker leveraging <a href="https://facebook.github.io/react-native/docs/datepickerandroid" target="_blank">DatePickerAndroid</a> on Android and <a href="https://facebook.github.io/react-native/docs/datepickerios" target="_blank">DatePickerIOS</a> on iOS using an unified API.

- Integrates well in forms as a themable TextInput-like button
- Properly unified API and casted results (aligned on iOS).
- Supports an UTC-mode for tz-proofing the data.

This component is an alias to `<DatePicker mode="time" />`

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/fivmGX2.gif) | ![](https://i.imgur.com/IE5ZZVq.gif) |

## Usage

### Setup dependencies

Since this components uses a backdrop, you need to wrap your application with a `<BackdropProvider />` component. You usually want to wrap it as high as possible in your tree so that the backdrop properly covers the whole screen.

```tsx
// App.jsx

import React from 'react';
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

### Basic

The basic API is relatively close to a regular <a href="https://facebook.github.io/react-native/docs/textinput.html" target="_blank">TextInput</a>

```tsx
// MyComponent.jsx

import React from 'react';
import {Button} from 'react-native';
import {BackdropContext} from '@mgcrea/react-native-backdrop-provider';

const MyComponent = () => {
  const [time, setTime] = useState(new Date());
  return (
    <View>
      <Text style={{color: 'white', marginBottom: 12}}>Value: {time.toISOString()}</Text>
      <TimePicker title="Pick a time" value={time} onChange={setTime} />
    </View>
  );
};

export default MyComponent;
```

## Props

Refer to the [DatePicker](./date-picker.md#props) props
