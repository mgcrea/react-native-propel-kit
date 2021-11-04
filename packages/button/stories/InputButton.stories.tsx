// import React, {useState, createElement, useRef, useCallback} from 'react';
// import {Button, View, Modal, Text, TextInput, StyleSheet} from 'react-native';
// import {storiesOf} from '@storybook/react-native';

// import InnerStory from './components/InnerStory';
// import {InputButton, inputButtonDefaultProps} from '../src';

// const inputStyle = {
//   height: 60,
//   width: 120,
//   margin: 12,
//   fontSize: 18,
//   backgroundColor: 'white',
//   borderColor: 'gray',
//   color: 'red',
//   borderWidth: 1
// };

// storiesOf('InputButton', module)
//   .add('default view', () => {
//     const [text, setText] = useState<string>('value');
//     const onFocus = useCallback(() => {
//       console.warn('onFocus');
//     }, []);
//     return (
//       <>
//         <InputButton onFocus={onFocus} value={text} />
//         <TextInput onChangeText={setText} value={text} />
//       </>
//     );
//   })
//   .add('compare view', () => {
//     const [text, setText] = useState<string>('value');
//     const onFocus = useCallback(() => {
//       console.warn('onFocus');
//     }, []);
//     return (
//       <>
//         <InnerStory>
//           <InputButton onFocus={onFocus} value={text} />
//           <TextInput onChangeText={setText} value={text} />
//         </InnerStory>
//         <InnerStory>
//           <InputButton onFocus={onFocus} style={inputStyle} value={text} />
//           <TextInput style={inputStyle} onChangeText={setText} value={text} />
//         </InnerStory>
//         <InnerStory>
//           <InputButton onFocus={onFocus} style={inputStyle} value={text} editable={false} />
//           <TextInput style={inputStyle} value={text} editable={false} />
//         </InnerStory>
//         <InnerStory>
//           <InputButton onFocus={onFocus} style={inputStyle} placeholder={text} />
//           <TextInput style={inputStyle} placeholder={text} />
//         </InnerStory>
//       </>
//     );
//   });

import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useState} from 'react';
import {Button as NativeButton, StyleSheet, TextInput, View} from 'react-native';
import {InputButton} from '../src';
import {CenteredView, InnerStory} from './components';

const meta: ComponentMeta<typeof InputButton> = {
  title: 'Button/InputButton',
  component: InputButton,
  argTypes: {
    onFocus: {action: 'pressed the input button'},
    onPress: {action: 'focused the input button'}
  },
  args: {
    value: 'My InputButton'
  }
};

export default meta;

export const Basic: ComponentStory<typeof InputButton> = (args) => {
  return (
    <CenteredView>
      <InputButton {...args} />
    </CenteredView>
  );
};

export const Compare: ComponentStory<typeof InputButton> = ({value: initialValue, ...args}) => {
  const [value, setValue] = useState<string>(initialValue || '');
  return (
    <CenteredView>
      <InnerStory legend="basic">
        <InputButton value={value} {...args} />
        <TextInput onChangeText={setValue} value={value} />
      </InnerStory>
      <InnerStory legend="with style">
        <InputButton style={inputStyle} value={value} {...args} />
        <TextInput style={inputStyle} onChangeText={setValue} value={value} />
      </InnerStory>
      <InnerStory legend="with placeholder">
        <InputButton style={inputStyle} placeholder={value} {...args} />
        <TextInput style={inputStyle} placeholder={value} />
      </InnerStory>
      <InnerStory legend="non editable">
        <InputButton style={inputStyle} value={value} editable={false} {...args} />
        <TextInput style={inputStyle} onChangeText={setValue} value={value} editable={false} />
      </InnerStory>
    </CenteredView>
  );
};

const inputStyle = {
  height: 60,
  width: 120,
  margin: 12,
  fontSize: 18,
  backgroundColor: 'white',
  borderColor: 'gray',
  color: 'darkred',
  borderWidth: 1
};
