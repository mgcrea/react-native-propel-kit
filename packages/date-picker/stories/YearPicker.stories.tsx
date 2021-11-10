import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {YearPicker} from '../src';
import {CenteredView, InnerStory} from './components';

const meta: ComponentMeta<typeof YearPicker> = {
  title: 'DatePicker/YearPicker',
  component: YearPicker,
  argTypes: {
    // onChange: {action: 'value changed'}
  },
  args: {
    title: 'Pick a year',
    initialValue: 2000
  }
};

export default meta;

export const Basic: ComponentStory<typeof YearPicker> = (args) => {
  const [year, setYear] = useState<number>(args.initialValue as number);
  return (
    <CenteredView>
      <Text style={{color: 'black', textAlign: 'center', fontSize: 12}}>{year}</Text>
      <InnerStory legend="default">
        <YearPicker value={year} onChange={setYear} {...args} />
      </InnerStory>
    </CenteredView>
  );
};
