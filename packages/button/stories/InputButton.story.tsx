import React, {useState, createElement, useRef, useCallback} from 'react';
import {Button, View, Modal, Text, TextInput, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import WhiteBox from './components/WhiteBox';
import {InputButton, inputButtonDefaultProps} from '../src';

const inputStyle = {
  height: 60,
  width: 120,
  margin: 12,
  fontSize: 18,
  backgroundColor: 'white',
  borderColor: 'gray',
  color: 'red',
  borderWidth: 1
};

storiesOf('InputButton', module)
  .add('default view', () => {
    const [text, setText] = useState<string>('value');
    const onFocus = useCallback(() => {
      console.warn('onFocus');
    }, []);
    return (
      <>
        <InputButton onFocus={onFocus} value={text} />
        <TextInput onChangeText={setText} value={text} />
      </>
    );
  })
  .add('compare view', () => {
    const [text, setText] = useState<string>('value');
    const onFocus = useCallback(() => {
      console.warn('onFocus');
    }, []);
    return (
      <>
        <WhiteBox>
          <InputButton onFocus={onFocus} value={text} />
          <TextInput onChangeText={setText} value={text} />
        </WhiteBox>
        <WhiteBox>
          <InputButton onFocus={onFocus} style={inputStyle} value={text} />
          <TextInput style={inputStyle} onChangeText={setText} value={text} />
        </WhiteBox>
        <WhiteBox>
          <InputButton onFocus={onFocus} style={inputStyle} value={text} editable={false} />
          <TextInput style={inputStyle} value={text} editable={false} />
        </WhiteBox>
        <WhiteBox>
          <InputButton onFocus={onFocus} style={inputStyle} placeholder={text} />
          <TextInput style={inputStyle} placeholder={text} />
        </WhiteBox>
      </>
    );
  });
