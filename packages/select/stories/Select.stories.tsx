import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useEffect, useState} from 'react';
import {Button as NativeButton, ScrollView} from 'react-native';
import {Select, SelectItem} from '../src';
import {CenteredView, CustomInputButtonComponent, InnerStory} from './components';
import {NATIONALITY_SELECT_ITEMS} from './fixtures';

const meta: ComponentMeta<typeof Select> = {
  title: 'Select',
  component: Select,
  argTypes: {
    onSelect: {action: 'selected a value'}
  },
  args: {}
};

export default meta;

export const Basic: ComponentStory<typeof Select> = (args) => {
  return (
    <CenteredView>
      <Select placeholder="Language" {...args}>
        <Select.Item label="Java" value="java" />
        <Select.Item label="JavaScript" value="js" />
      </Select>
    </CenteredView>
  );
};

export const CustomInputButton: ComponentStory<typeof Select> = (args) => {
  return (
    <CenteredView>
      <Select placeholder="Language" InputButtonComponent={CustomInputButtonComponent} {...args}>
        <Select.Item label="Java" value="java" />
        <Select.Item label="JavaScript" value="js" />
      </Select>
    </CenteredView>
  );
};

export const ManyItems: ComponentStory<typeof Select> = (args) => {
  return (
    <CenteredView>
      <Select placeholder="Nationalité">
        {NATIONALITY_SELECT_ITEMS.map((option) => (
          <SelectItem key={option.value} {...option} />
        ))}
      </Select>
    </CenteredView>
  );
};

export const ManyItemsInsideScrollView: ComponentStory<typeof Select> = (args) => {
  return (
    <CenteredView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Select placeholder="Nationalité">
          {NATIONALITY_SELECT_ITEMS.map((option) => (
            <SelectItem key={option.value} {...option} />
          ))}
        </Select>
      </ScrollView>
    </CenteredView>
  );
};

export const ManyItemsWithAsyncSelect: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState<string | undefined>();
  useEffect(() => {
    setTimeout(() => {
      setValue('jp');
    }, 200);
  }, []);
  return (
    <CenteredView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Select placeholder="Nationalité" value={value} onChange={setValue}>
          {NATIONALITY_SELECT_ITEMS.map((option) => (
            <SelectItem key={option.value} {...option} />
          ))}
        </Select>
      </ScrollView>
    </CenteredView>
  );
};
