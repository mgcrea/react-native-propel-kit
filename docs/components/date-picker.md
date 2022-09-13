---
id: date-picker
title: DatePicker
hide_title: true
---

# DatePicker

The `<DatePicker />`component gives your a easy-to-use cross platform date picker leveraging <a href="https://facebook.github.io/react-native/docs/datepickerandroid" target="_blank">DatePickerAndroid</a> on Android and <a href="https://facebook.github.io/react-native/docs/datepickerios" target="_blank">DatePickerIOS</a> on iOS using an unified API.

- Integrates well in forms as a themable TextInput-like button
- Properly unified API and casted results (aligned on iOS).
- Supports an UTC-mode for tz-proofing the data.

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/CDkg113.gif) | ![](https://i.imgur.com/bSzWdjP.gif) |

## Usage

### Setup dependencies

Install @react-native-community/datetimepicker dependency : `npm i @react-native-community/datetimepicker`.

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

### Basic

The basic API is relatively close to a regular <a href="https://facebook.github.io/react-native/docs/textinput.html" target="_blank">TextInput</a>

```tsx
// MyComponent.jsx

import React from 'react';
import {Button} from 'react-native';
import {BackdropContext, DatePicker} from 'react-native-propel-kit';

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
export type Props = Pick<InputButtonProps, 'placeholder' | 'style'> &
  Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> &
  Pick<DatePickerIOSProps, 'mode' | 'locale'> & {
    children?: ReactNode;
    // DatePicker props
    initialValue?: Date;
    InputButtonComponent?: ElementType<InputButtonProps>;
    labelExtractor?: (value: Date, options: LabelExtractorOptions) => string;
    onChange?: (value: Date) => void;
    onSubmitEditing?: (value: Date) => void;
    placeholder?: string;
    value?: Date;
    utc?: boolean;
    androidMode?: DatePickerAndroidOpenOptions['mode'] | TimePickerAndroidOpenOptions['mode'];
    [s: string]: any; // otherInputButtonProps
  };
```

### Defaults

```ts
export const defaultProps = {
  androidMode: 'spinner' as DatePickerAndroidOpenOptions['mode'] | TimePickerAndroidOpenOptions['mode'],
  initialValue: FIRST_DAY_OF_YEAR,
  InputButtonComponent: InputButton,
  labelExtractor: defaultLabelExtractor,
  locale: navigator.language,
  mode: 'date' as DatePickerIOSProps['mode'],
  utc: false
};
```
