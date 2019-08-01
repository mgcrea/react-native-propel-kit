import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import {DateTimePicker} from '../src';

storiesOf('DateTimePicker', module).add('default view', () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <>
      <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
      <DateTimePicker title="Pick a date" value={date} onChange={setDate} />
    </>
  );
});
