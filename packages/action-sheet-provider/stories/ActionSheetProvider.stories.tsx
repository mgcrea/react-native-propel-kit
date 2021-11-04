import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useRef} from 'react';
import {ActionSheetContext, ActionSheetProvider} from '../src';
import {CenteredView} from './components';
import {Button} from '@mgcrea/react-native-button';
import {ActionSheetIOS, Text} from 'react-native';
import ModalDialog, {ModalDialogHandle} from '@mgcrea/react-native-modal-dialog';

const meta: ComponentMeta<typeof ActionSheetProvider> = {
  title: 'ActionSheetProvider',
  component: ActionSheetProvider,
  argTypes: {
    onButtonPress: {action: 'pressed the button'}
  },
  args: {
    native: false
  }
};

export default meta;

export const Basic: ComponentStory<typeof ActionSheetProvider> = (args) => {
  return (
    <ActionSheetProvider {...args}>
      <CenteredView>
        <ActionSheetContext.Consumer>
          {(actionSheet) => (
            <Button
              onPress={() => {
                actionSheet.showWithOptions(
                  {
                    title: 'Hello',
                    message: `This component implements a custom ActionSheet and provides the same way to drawing it`,
                    options: ['Cancel', 'Remove', 'Update'],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0
                  },
                  (buttonIndex) => {
                    // console.warn('onButtonPress', {buttonIndex});
                  }
                );
              }}
              title="Show ActionSheet"
            />
          )}
        </ActionSheetContext.Consumer>
      </CenteredView>
    </ActionSheetProvider>
  );
};

export const ManyOptions: ComponentStory<typeof ActionSheetProvider> = (args) => {
  return (
    <ActionSheetProvider {...args}>
      <CenteredView>
        <ActionSheetContext.Consumer>
          {(actionSheet) => (
            <Button
              onPress={() => {
                actionSheet.showWithOptions(
                  {
                    title: 'Hello',
                    message: `This component implements a custom ActionSheet and provides the same way to drawing it`,
                    options: [
                      'Cancel',
                      'Remove',
                      'Update',
                      'Cancel',
                      'Remove',
                      'Update',
                      'Cancel',
                      'Remove',
                      'Update',
                      'Cancel',
                      'Remove',
                      'Update'
                    ],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0
                  },
                  (buttonIndex) => {
                    // console.warn('onButtonPress', {buttonIndex});
                  }
                );
              }}
              title="Show ActionSheet"
            />
          )}
        </ActionSheetContext.Consumer>
      </CenteredView>
    </ActionSheetProvider>
  );
};

export const Compare: ComponentStory<typeof ActionSheetProvider> = (args) => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  return (
    <ActionSheetProvider {...args}>
      <CenteredView>
        <ActionSheetContext.Consumer>
          {(actionSheet) => (
            <Button
              onPress={() => {
                actionSheet.showWithOptions(
                  {
                    title: 'Hello',
                    message: `This component implements a custom ActionSheet and provides the same way to drawing it`,
                    options: ['Cancel', 'Remove', 'Update'],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0
                  },
                  (buttonIndex) => {
                    // console.warn('onButtonPress', {buttonIndex});
                  }
                );
              }}
              title="Show ActionSheet"
            />
          )}
        </ActionSheetContext.Consumer>
        <Button
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                title: 'Hello',
                message: `This component implements a custom ActionSheet and provides the same way to drawing it`,
                options: ['Cancel', 'Remove', 'Update'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0
              },
              (buttonIndex) => {
                // console.warn('onButtonPress', {buttonIndex});
              }
            );
          }}
          title="Show Native ActionSheet"
        />
        <>
          <Button
            onPress={() => {
              if (modalDialogRef.current) {
                modalDialogRef.current.show();
              }
            }}
            title="Open ModalDialog"
          />
          <ModalDialog ref={modalDialogRef}>
            <Text style={{fontSize: 32, padding: 32}}>Hello World</Text>
          </ModalDialog>
        </>
        {/* <DatePicker
          placeholder="Pick a date"
          locale="fr-FR"
          style={{width: 200, height: 40, backgroundColor: 'white', color: 'black'}}
        /> */}
      </CenteredView>
    </ActionSheetProvider>
  );
};
