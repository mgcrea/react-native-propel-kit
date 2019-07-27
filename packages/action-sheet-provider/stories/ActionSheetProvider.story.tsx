import React, {useState, createElement} from 'react';
import {Button, View, Modal, Text, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import {ActionSheetContext, ActionSheetContextProps} from '../src';

storiesOf('ActionSheetProvider', module).add('default view', () =>
  createElement(() => {
    return (
      <ActionSheetContext.Consumer>
        {actionSheet => (
          <>
            <Button
              onPress={() => {
                (actionSheet as NonNullable<ActionSheetContextProps>).showWithOptions(
                  {
                    options: ['Cancel', 'Remove'],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0
                  },
                  buttonIndex => {
                    if (buttonIndex === 1) {
                      /* destructive action */
                    }
                  }
                );
              }}
              title="Open"
            />
          </>
        )}
      </ActionSheetContext.Consumer>
    );
  })
);
