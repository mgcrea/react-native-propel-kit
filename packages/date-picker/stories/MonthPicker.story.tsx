import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import {MonthPicker} from '../src';

storiesOf('MonthPicker', module).add('default view', () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <>
      {/* <Text>{navigator.language}</Text> */}
      <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
      <MonthPicker title="Pick a month" value={date} onChange={setDate} />
    </>
  );
});
