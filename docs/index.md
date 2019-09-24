---
id: index
title: Quick Start
hide_title: true
sidebar_label: Quick Start
---

# Quick Start

## Introduction

> **React Native Propel Kit** is a [React Native](https://facebook.github.io/react-native/) library providing basic **building blocks** for your next mobile application! This library is written in [TypeScript](https://www.typescriptlang.org/) using exclusively functional components leveraging [React hooks](https://reactjs.org/docs/hooks-intro.html).

## Installation

React Native Propel Kit requires **React 16.8.0 or later.**

To use React Native Propel Kit with your React app:

```bash
yarn add react-native-propel-kit
```

or if you are _(still)_ using npm

```bash
npm install react-native-propel-kit
```

## Providers

React Native Propel Kit components often rely on specific providers, for instance, most of them use `<BackdropProvider />`, which enables a backdrop for the rest of your app:

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import {BackdropProvider} from 'react-native-propel-kit';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BackdropProvider>
    <App />
  </BackdropProvider>,
  rootElement
);
```

## Components

Once you've properly setup the required providers, you can use some components, for instance a `<Select />`:

```tsx
import React, {ReactNode, FunctionComponent} from 'react';
import {View} from 'react-native';
import {Select} from 'react-native-propel-kit';

type Props = {};

const CenteredView: FunctionComponent<Props> = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 32
    }}>
    <Select placeholder="Language">
      <Select.Item label="Java" value="java" />
      <Select.Item label="JavaScript" value="js" />
    </Select>
  </View>
);

export default CenteredView;
```

## Help and Discussion

You should ask questions on [Stack Overflow](https://stackoverflow.com) using the **[#react-native tag](https://stackoverflow.com/questions/tagged/react-native)**.
