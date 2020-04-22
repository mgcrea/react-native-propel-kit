import React, {useState, createElement, useCallback, useRef} from 'react';
import {Button as NativeButton, View, Modal, Text, TextInput, StyleSheet, Platform} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import Pressable from '../src';

storiesOf('Pressable', module).add('default view', () => {
  const [title, setTitle] = useState<string>('Learn More');
  const onPress = useCallback(() => {
    console.warn('onPress');
  }, []);
  return (
    <>
      <Pressable onPress={onPress} title={title} />
    </>
  );
});
