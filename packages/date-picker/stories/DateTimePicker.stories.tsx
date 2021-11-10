import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useState} from 'react';
import {DateTimePicker} from '../src';
import {CenteredView, DebugDateValue, InnerStory} from './components';

const meta: ComponentMeta<typeof DateTimePicker> = {
  title: 'DatePicker/DateTimePicker',
  component: DateTimePicker,
  argTypes: {
    // onChange: {action: 'value changed'}
  },
  args: {
    title: 'Pick a datetime'
  }
};

export default meta;

export const Basic: ComponentStory<typeof DateTimePicker> = (args) => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <CenteredView>
      <DebugDateValue value={date} />
      <InnerStory legend="default">
        <DateTimePicker value={date} onChange={setDate} {...args} />
      </InnerStory>
      <InnerStory legend="utc">
        <DateTimePicker value={date} onChange={setDate} utc {...args} />
      </InnerStory>
      <InnerStory legend="trim">
        <DateTimePicker value={date} onChange={setDate} trim {...args} />
      </InnerStory>
      <InnerStory legend="utc + trim">
        <DateTimePicker value={date} onChange={setDate} utc trim {...args} />
      </InnerStory>
      <InnerStory legend="uncontrolled">
        <DateTimePicker {...args} />
      </InnerStory>
    </CenteredView>
  );
};
