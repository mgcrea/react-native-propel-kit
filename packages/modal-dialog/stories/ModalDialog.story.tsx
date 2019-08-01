import React, {useRef, useEffect} from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Button from '@mgcrea/react-native-button';

import ModalDialog, {ModalDialogHandle} from '../src';

storiesOf('ModalDialog', module).add('default view', () => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  // AutoOpen
  useEffect(() => {
    setTimeout(() => {
      if (modalDialogRef.current) {
        modalDialogRef.current.show();
      }
    });
  }, []);
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
      <ModalDialog title="Hello" message="World" ref={modalDialogRef} onCancel={() => {}} onConfirm={() => {}}>
        <Text style={{fontSize: 32, padding: 32, backgroundColor: 'red'}}>Hello World</Text>
      </ModalDialog>
    </>
  );
});
