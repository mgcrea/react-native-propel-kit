import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useRef} from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import ModalDialog, {modalDialogDefaultProps, ModalDialogHandle} from '../src';
import {CenteredView} from './components';

const meta: ComponentMeta<typeof ModalDialog> = {
  title: 'ModalDialog',
  component: ModalDialog,
  argTypes: {},
  args: modalDialogDefaultProps
};

export default meta;

export const Basic: ComponentStory<typeof ModalDialog> = (args) => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  return (
    <CenteredView>
      <Button
        onPress={() => {
          if (modalDialogRef.current) {
            modalDialogRef.current.show();
          }
        }}
        title="Open modal dialog"
      />
      <ModalDialog
        title="Some Title"
        message="Some long message"
        ref={modalDialogRef}
        onCancel={() => {}}
        onConfirm={() => {}}>
        <Text style={styles.modalText}>Hello World</Text>
      </ModalDialog>
    </CenteredView>
  );
};

const styles = StyleSheet.create({
  modalText: {
    fontSize: 32,
    paddingVertical: 44,
    textAlign: 'center',
    alignSelf: 'stretch'
  }
});
