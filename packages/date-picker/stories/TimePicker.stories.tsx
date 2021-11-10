import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useState} from 'react';
import {TimePicker} from '../src';
import {CenteredView, DebugDateValue, InnerStory} from './components';

const meta: ComponentMeta<typeof TimePicker> = {
  title: 'DatePicker/TimePicker',
  component: TimePicker,
  argTypes: {
    // onChange: {action: 'value changed'}
  },
  args: {
    title: 'Pick a time'
  }
};

export default meta;

export const Basic: ComponentStory<typeof TimePicker> = (args) => {
  const [time, setTime] = useState<Date>(new Date());
  return (
    <CenteredView>
      <DebugDateValue value={time} />
      <InnerStory legend="default">
        <TimePicker value={time} onChange={setTime} {...args} />
      </InnerStory>
      <InnerStory legend="utc">
        <TimePicker value={time} onChange={setTime} utc {...args} />
      </InnerStory>
      <InnerStory legend="trim">
        <TimePicker value={time} onChange={setTime} trim {...args} />
      </InnerStory>
      <InnerStory legend="utc + trim">
        <TimePicker value={time} onChange={setTime} utc trim {...args} />
      </InnerStory>
      <InnerStory legend="uncontrolled">
        <TimePicker {...args} />
      </InnerStory>
    </CenteredView>
  );
};
