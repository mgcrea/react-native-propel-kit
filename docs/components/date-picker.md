---
id: date-picker
title: DatePicker
hide_title: true
---

# DatePicker

Components that gives your a easy-to-use cross platform DatePicker leveraging <a href="https://facebook.github.io/react-native/docs/datepickerandroid" target="_blank">DatePickerAndroid</a> on Android and <a href="https://facebook.github.io/react-native/docs/datepickerios" target="_blank">DatePickerIOS</a> on iOS using an unified API.

- Integrates well in forms as a themable TextInput-like button
- Properly unified API and casted results (aligned on iOS).
- Supports an UTC-mode for tz-proofing the data.

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/pOw4zcs.gif) | ![](https://i.imgur.com/ttZaJxy.gif) |

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
  const [date, setDate] = useState(new Date());
  return (
    <View>
      <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
      <DatePicker title="Pick a date" value={date} onChange={setDate} />
    </View>
  );
};

export default MyComponent;
```

## Props

```ts
type Props = Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> &
  Pick<DatePickerIOSProps, 'mode' | 'locale'> & {
    children?: ReactNode;
    // DatePicker props
    initialValue?: Date;
    InputButtonComponent?: ElementType<InputButtonProps>;
    labelExtractor?: (value: Date, options: LabelExtractorOptions) => string;
    onChange?: (value: Date) => void;
    onSubmitEditing?: (value: Date) => void;
    value?: Date;
    utc?: boolean;
    androidMode?: DatePickerAndroidOpenOptions['mode'] | TimePickerAndroidOpenOptions['mode'];
  };
```

### Defaults

```ts
import {InputButton, InputButtonProps} from '@mgcrea/react-native-button';
import defaultLabelExtractor, {LabelExtractorOptions} from './utils/defaultLabelExtractor';

const CURRENT_YEAR = new Date().getFullYear();
const FIRST_DAY_OF_YEAR = new Date(Date.UTC(CURRENT_YEAR, 0, 1));

const defaultProps = {
  androidMode: 'spinner',
  initialValue: FIRST_DAY_OF_YEAR,
  InputButtonComponent: InputButton,
  labelExtractor: defaultLabelExtractor,
  locale: navigator.language,
  mode: 'date',
  utc: false
};
```
