import React, {useRef} from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Button from '@mgcrea/react-native-button';

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
