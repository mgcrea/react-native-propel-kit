// import React, {useState} from 'react';
// import {Text, StyleSheet} from 'react-native';
// import {storiesOf} from '@storybook/react-native';

// import {MonthPicker} from '../src';

// storiesOf('MonthPicker', module).add('default view', () => {
//   const [date, setDate] = useState<Date>(new Date());
//   return (
//     <>
//       {/* <Text>{navigator.language}</Text> */}
//       <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
//       <MonthPicker title="Pick a month" value={date} onChange={setDate} />
//     </>
//   );
// });

import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {useState} from 'react';
import {MonthPicker} from '../src';
import {CenteredView, DebugDateValue, InnerStory} from './components';

const meta: ComponentMeta<typeof MonthPicker> = {
  title: 'DatePicker/MonthPicker',
  component: MonthPicker,
  argTypes: {
    // onChange: {action: 'value changed'}
  },
  args: {
    title: 'Pick a month'
  }
};

export default meta;

export const Basic: ComponentStory<typeof MonthPicker> = (args) => {
  const [month, setMonth] = useState<Date>(new Date());
  return (
    <CenteredView>
      <DebugDateValue value={month} />
      <InnerStory legend="default">
        <MonthPicker value={month} onChange={setMonth} {...args} />
      </InnerStory>
      <InnerStory legend="utc">
        <MonthPicker value={month} onChange={setMonth} utc {...args} />
      </InnerStory>
      <InnerStory legend="trim">
        <MonthPicker value={month} onChange={setMonth} trim {...args} />
      </InnerStory>
      <InnerStory legend="utc + trim">
        <MonthPicker value={month} onChange={setMonth} utc trim {...args} />
      </InnerStory>
      <InnerStory legend="uncontrolled">
        <MonthPicker {...args} />
      </InnerStory>
    </CenteredView>
  );
};
