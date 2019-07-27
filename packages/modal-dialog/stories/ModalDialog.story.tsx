import React, {useState, createElement, useRef} from 'react';
import {Button, View, Modal, Text, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import ModalDialog, {ModalDialogHandle} from '../src';

storiesOf('ModalDialog', module).add('default view', () => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  return (
    <>
      <Button
        onPress={() => {
          if (modalDialogRef.current) {
            modalDialogRef.current.show();
          }
        }}
        title="Open"
      />
      <ModalDialog ref={modalDialogRef}>
        <Text style={{fontSize: 32, padding: 32}}>Hello World</Text>
      </ModalDialog>
    </>
  );
});
