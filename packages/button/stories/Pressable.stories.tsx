import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React from 'react';
import Pressable from '../src';
import {CenteredView} from './components';

const meta: ComponentMeta<typeof Pressable> = {
  title: 'Button/Pressable',
  component: Pressable,
  argTypes: {
    onPress: {action: 'pressed the pressable button'}
  },
  args: {
    title: 'My Pressable'
  }
};

export default meta;

export const Basic: ComponentStory<typeof Pressable> = (args) => {
  return (
    <CenteredView>
      <Pressable {...args} />
    </CenteredView>
  );
};
