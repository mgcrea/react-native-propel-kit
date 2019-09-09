import React, {useState, createElement, useCallback, useRef} from 'react';
import {Button as NativeButton, View, Modal, Text, TextInput, StyleSheet, Platform} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import Button from '../src';

storiesOf('Button', module)
  .add('default view', () => {
    const [title, setTitle] = useState<string>('Learn More');
    const onPress = useCallback(() => {
      console.warn('onPress');
    }, []);
    return (
      <>
        <Button onPress={onPress} title={title} />
      </>
    );
  })
  // .add('loading prop', () => {
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const onPress = useCallback(() => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }, []);
  //   return (
  //     <>
  //       <Button onPress={onPress} title="Learn More" loading={loading} style={{marginBottom: 12}} />
  //       <Button onPress={onPress} title="Learn More" loading={true} />
  //     </>
  //   );
  // })
  .add('compare view', () => {
    const [title, setTitle] = useState<string>('Learn More');
    const onPress = useCallback(() => {
      console.warn('onPress');
    }, []);
    return (
      <>
        <Button
          onPress={onPress}
          title={title}
          color="black"
          disabled
          accessibilityLabel="Learn more about this purple button"
        />
        <NativeButton
          onPress={onPress}
          title={title}
          disabled
          accessibilityLabel="Learn more about this purple button"
        />
      </>
    );
  });
