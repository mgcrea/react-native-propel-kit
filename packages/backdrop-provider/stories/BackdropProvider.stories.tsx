import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useState} from 'react';
import {Button, Modal, StyleSheet, View} from 'react-native';
import BackdropProvider, {BackdropContext, backdropProviderDefaultProps} from '..';

const meta: ComponentMeta<typeof BackdropProvider> = {
  title: 'BackdropProvider',
  component: BackdropProvider,
  argTypes: {},
  args: backdropProviderDefaultProps
};

export default meta;

export const Basic: ComponentStory<typeof BackdropProvider> = (args) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  return (
    <BackdropProvider {...args}>
      <BackdropContext.Consumer>
        {(backdrop) => (
          <>
            <Button
              onPress={() => {
                backdrop!.toggle();
                setModalIsVisible(true);
              }}
              title="Open"
            />
            <Modal visible={modalIsVisible} transparent>
              <View style={styles.modalView}>
                <Button
                  onPress={() => {
                    backdrop!.toggle();
                    setModalIsVisible(false);
                  }}
                  title="Close"
                />
              </View>
            </Modal>
          </>
        )}
      </BackdropContext.Consumer>
    </BackdropProvider>
  );
};

const styles = StyleSheet.create({
  modalView: {
    top: '40%',
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
