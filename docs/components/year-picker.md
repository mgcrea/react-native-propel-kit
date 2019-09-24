---
id: year-picker
title: YearPicker
hide_title: true
---

# YearPicker

The `<YearPicker />` component gives you easy-to-use cross platform year picker leveraging this library [Select](./select.md) using an unified API.

- Integrates well in forms as a themable TextInput-like button
- Properly unified API and casted results.
- Supports an UTC-mode for tz-proofing the data.

## Preview

|                 iOS                  |               Android                |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/O2lHGoo.gif) | ![](https://i.imgur.com/ZV2ZJWX.gif) |

### Sources

You can check the <a href="https://github.com/mgcrea/react-native-propel-kit/blob/master/packages/date-picker/src/YearPicker.tsx" target="_blank">source code directly on GitHub</a>.

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

### Basic example

The basic API is relatively close to a regular <a href="https://facebook.github.io/react-native/docs/textinput.html" target="_blank">TextInput</a>

```tsx
// MyComponent.jsx

import React from 'react';
import {Button} from 'react-native';
import {YearPicker} from 'react-native-propel-kit';

const MyComponent = () => {
  const [year, setYear] = useState<number>(2019);
  return (
    <>
      <Text style={{color: 'white', marginBottom: 12}}>Value: {year}</Text>
      <YearPicker title="Pick a year" value={year} onChange={setYear} />
    </>
  );
};

export default MyComponent;
```

## Props

```ts
export type Props = SelectProps & {
  onChange?: (value: number) => void;
  labelExtractor?: (value: number, options: LabelExtractorOptions) => string;
  minValue?: number;
  maxValue?: number;
  locale?: string;
};
```

### Defaults

```ts
export const defaultProps = {
  initialValue: CURRENT_YEAR,
  InputButtonComponent: InputButton,
  labelExtractor: (value: number) => `${value}`,
  locale: navigator.language,
  minValue: CURRENT_YEAR - 50,
  maxValue: CURRENT_YEAR + 20
};
```
