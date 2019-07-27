import React, {useState, createElement} from 'react';
import {View, Modal, Text, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Button from '@mgcrea/react-native-button';

import {BackdropContext} from '../src';

storiesOf('BackdropProvider', module).add('default view', () =>
  createElement(() => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
    return (
      <BackdropContext.Consumer>
        {backdrop => (
          <>
            <Button
              onPress={() => {
                backdrop!.toggle();
                setModalIsVisible(true);
              }}
              title="Open"
            />
            <Modal visible={modalIsVisible} transparent>
              <View
                style={[
                  {
                    top: '40%',
                    marginHorizontal: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                ]}
              >
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
    );
  })
);
