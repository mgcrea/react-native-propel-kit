import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React from 'react';
import {Button as NativeButton} from 'react-native';
import {Button} from '../src';
import {CenteredView, InnerStory} from './components';

const meta: ComponentMeta<typeof Button> = {
  title: 'Button/Button',
  component: Button,
  argTypes: {
    onPress: {action: 'pressed the button'}
  },
  args: {
    title: 'My Button'
  }
};

export default meta;

export const Basic: ComponentStory<typeof Button> = (args) => {
  return (
    <CenteredView>
      <Button {...args} />
    </CenteredView>
  );
};

export const Compare: ComponentStory<typeof Button> = (args) => {
  return (
    <CenteredView>
      <InnerStory legend="basic">
        <Button accessibilityLabel="Learn more about this purple button" {...args} />
        <NativeButton accessibilityLabel="Learn more about this purple button" {...args} />
      </InnerStory>
      <InnerStory legend="disabled">
        <Button disabled {...args} />
        <NativeButton disabled {...args} />
      </InnerStory>
    </CenteredView>
  );
};
