import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {DatePicker} from '../src';
import {CenteredView, DebugDateValue, InnerStory} from './components';

const meta: ComponentMeta<typeof DatePicker> = {
  title: 'DatePicker',
  component: Text,
  argTypes: {
    // onPress: {action: 'pressed the button'}
  },
  args: {
    title: 'Pick a date'
  }
};

export default meta;

export const Basic: ComponentStory<typeof DatePicker> = (args) => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <CenteredView>
      <DebugDateValue value={date} />
      <InnerStory legend="default">
        <DatePicker value={date} onChange={setDate} {...args} />
      </InnerStory>
      <InnerStory legend="utc">
        <DatePicker value={date} onChange={setDate} utc {...args} />
      </InnerStory>
      <InnerStory legend="trim">
        <DatePicker value={date} onChange={setDate} trim {...args} />
      </InnerStory>
      <InnerStory legend="utc + trim">
        <DatePicker value={date} onChange={setDate} utc trim {...args} />
      </InnerStory>
      <InnerStory legend="uncontrolled">
        <DatePicker {...args} />
      </InnerStory>
    </CenteredView>
  );
};
