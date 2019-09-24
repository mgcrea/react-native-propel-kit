import React, {useState} from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import DatePicker from '../src';

storiesOf('DatePicker', module)
  .add('default view', () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
      <>
        <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
        <DatePicker title="Pick a date" androidMode="spinner" value={date} onChange={setDate} />
        {/* <DatePicker title="Pick a date" androidMode="calendar" value={date} onChange={setDate} /> */}
      </>
    );
  })
  .add('compare view', () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
      <>
        {/* {Intl ? <Text style={{color: 'white'}}>TimeZone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</Text> : null} */}
        <Text style={{color: 'white', marginBottom: 12}}>Value: {date.toISOString()}</Text>
        <DatePicker title="Pick a date" locale="fr-FR" value={date} onChange={setDate} />
        <DatePicker title="Pick a time" locale="en-US" mode="time" value={date} onChange={setDate} />
        <DatePicker title="Pick a datetime" mode="datetime" value={date} onChange={setDate} />
      </>
    );
  });
