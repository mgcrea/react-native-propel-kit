import React, {useState} from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import {YearPicker} from '../src';

storiesOf('YearPicker', module).add('default view', () => {
  const [year, setYear] = useState<number>(2019);
  return (
    <>
      <Text style={{color: 'white', marginBottom: 12}}>Value: {year}</Text>
      <YearPicker title="Pick a month" value={year} onChange={setYear} />
    </>
  );
});
