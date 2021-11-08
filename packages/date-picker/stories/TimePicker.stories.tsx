import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {FunctionComponent, useState} from 'react';
import {Text} from 'react-native';
import {TimePicker} from '../src';
import {CenteredView, InnerStory} from './components';

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
      <DebugValue value={time} />
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

const DebugValue: FunctionComponent<{value: Date}> = ({value}) => {
  return (
    <>
      <Text style={{color: 'black', textAlign: 'center', fontSize: 12, paddingVertical: 24}}>
        {value.toISOString()}
        {'\n'}
        {value.toLocaleString()}
      </Text>
    </>
  );
};
