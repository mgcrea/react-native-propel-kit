import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import {TimePicker} from '../src';

storiesOf('TimePicker', module).add('default view', () => {
  const [time, setTime] = useState<Date>(new Date());
  return (
    <>
      <Text style={{color: 'white', marginBottom: 12}}>Value: {time.toISOString()}</Text>
      <TimePicker title="Pick a time" value={time} onChange={setTime} />
    </>
  );
});
