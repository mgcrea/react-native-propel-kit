// import React, {useState} from 'react';
// import {Text} from 'react-native';
// import {storiesOf} from '@storybook/react-native';

// import DatePicker from '../src';

// storiesOf('DatePicker', module)
//   .add('default view', () => {
//     const [date, setDate] = useState<Date>(new Date());
//     return (
//       <>
//         <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
//         <DatePicker title="Pick a date" androidMode="spinner" value={date} onChange={setDate} />
//         {/* <DatePicker title="Pick a date" androidMode="calendar" value={date} onChange={setDate} /> */}
//       </>
//     );
//   })
//   .add('compare view', () => {
//     const [date, setDate] = useState<Date>(new Date());
//     return (
//       <>
//         {/* {Intl ? <Text style={{color: 'white'}}>TimeZone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</Text> : null} */}
//         <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
//         <DatePicker title="Pick a date" locale="fr-FR" value={date} onChange={setDate} />
//         <DatePicker title="Pick a time" locale="en-US" mode="time" value={date} onChange={setDate} />
//         <DatePicker title="Pick a datetime" mode="datetime" value={date} onChange={setDate} />
//       </>
//     );
//   });

import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {DatePicker} from '../src';
import {CenteredView, InnerStory} from './components';

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
      <DebugValue value={date} />
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
