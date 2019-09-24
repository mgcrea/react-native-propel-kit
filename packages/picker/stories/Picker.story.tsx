import React, {useState, useEffect, useCallback} from 'react';
import {storiesOf} from '@storybook/react-native';
// import {View} from 'react-native';

import Picker from '../src';
import {NATIONALITY_SELECT_ITEMS} from './fixtures';

const defaultStyle = {backgroundColor: 'white', alignSelf: 'stretch', margin: 24};

storiesOf('Picker', module)
  .add('two-item select', () => {
    const [value, setValue] = useState();
    // @NOTE we drop the second arg, to prevent setState warnings
    const handleValueChange = useCallback((nextValue: string) => {
      setValue(nextValue);
    }, []);
    return (
      <Picker selectedValue={value} onValueChange={handleValueChange} style={defaultStyle}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    );
  })
  .add('many-items select', () => {
    const [value, setValue] = useState();
    // @NOTE we drop the second arg, to prevent setState warnings
    const handleValueChange = useCallback((nextValue: string) => {
      setValue(nextValue);
    }, []);
    return (
      <Picker selectedValue={value} onValueChange={handleValueChange} style={defaultStyle}>
        {NATIONALITY_SELECT_ITEMS.map(option => (
          <Picker.Item key={option.value} {...option} />
        ))}
      </Picker>
    );
  })
  .add('many-items select with async selectedValue', () => {
    const [value, setValue] = useState();
    // @NOTE we drop the second arg, to prevent setState warnings
    const handleValueChange = useCallback((nextValue: string) => {
      setValue(nextValue);
    }, []);
    useEffect(() => {
      setTimeout(() => {
        setValue('jp');
      }, 500);
    }, []);
    return (
      <Picker selectedValue={value} onValueChange={handleValueChange} style={defaultStyle}>
        {NATIONALITY_SELECT_ITEMS.map(option => (
          <Picker.Item key={option.value} {...option} />
        ))}
      </Picker>
    );
  });
