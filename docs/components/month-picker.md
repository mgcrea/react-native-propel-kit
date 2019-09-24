---
id: month-picker
title: MonthPicker
hide_title: true
---

# MonthPicker

The `<MonthPicker />` component gives you easy-to-use cross platform month picker leveraging this library [ModalDialog](./modal-dialog.md) and cross-platform [Picker](./picker.md) using an unified API.

- Integrates well in forms as a themable TextInput-like button
- Properly unified API and casted results.
- Supports an UTC-mode for tz-proofing the data.

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/92dhe1i.gif) | ![](https://i.imgur.com/eYgSSCy.gif) |

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
  const [date, setDate] = useState<Date>(new Date());
  return (
    <View>
      <Text style={{color: 'white', marginBottom: 12}}>Value: {time.toISOString()}</Text>
      <MonthPicker title="Pick a month" value={date} onChange={setDate} />
    </View>
  );
};

export default MyComponent;
```

## Props

```ts
export type Props = Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> &
  Pick<DatePickerIOSProps, 'locale'> & {
    children?: ReactNode;
    initialValue?: MonthPickerValue;
    InputButtonComponent?: ElementType<InputButtonProps>;
    labelExtractor?: (value: Date, options: LabelExtractorOptions) => string;
    onChange?: (value: MonthPickerValue) => void;
    onSubmitEditing?: (value: MonthPickerValue) => void;
    placeholder?: string;
    minYear?: number;
    maxYear?: number;
    value?: MonthPickerValue;
    utc?: boolean;
    [s: string]: any; // otherInputButtonProps
  };
```

### Defaults

```ts
export const defaultProps = {
  initialValue: CURRENT_MONTH,
  InputButtonComponent: InputButton,
  labelExtractor: defaultLabelExtractor,
  locale: navigator.language || 'en-US',
  utc: true
};
```
