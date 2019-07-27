import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import DatePicker from '../src';

const inputStyle = {
  height: 40,
  width: 240,
  margin: 12,
  fontSize: 14,
  borderRadius: 4,
  padding: 8,
  backgroundColor: 'white',
  borderColor: '#C5CAE9',
  borderWidth: StyleSheet.hairlineWidth
};

storiesOf('DatePicker', module).add('default view', () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <>
      <Text style={{color: 'white'}}>TimeZone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</Text>
      <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
      <DatePicker title="Pick a date" locale="fr-FR" style={inputStyle} value={date} onChange={setDate} />
      <DatePicker title="Pick a time" locale="en-US" mode="time" style={inputStyle} value={date} onChange={setDate} />
      <DatePicker title="Pick a datetime" mode="datetime" style={inputStyle} value={date} onChange={setDate} />
    </>
  );
});
