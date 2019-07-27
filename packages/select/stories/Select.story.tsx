import React, {useState, useEffect, useCallback, FunctionComponent} from 'react';
import {Text, StyleSheet, ScrollView, View, TouchableWithoutFeedback, TextInputProps} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import Select, {SelectItem} from '../src';
import {NATIONALITY_SELECT_ITEMS} from './fixtures';

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

const CustomBasicInputButtonComponent: FunctionComponent<TextInputProps> = ({value, onFocus, placeholder}) => {
  const handlePress = useCallback(
    ev => {
      if (onFocus) {
        onFocus(ev);
      }
    },
    [onFocus]
  );
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Text style={{color: 'white', fontSize: 32}}>{value || placeholder}</Text>
    </TouchableWithoutFeedback>
  );
};

storiesOf('Select', module)
  .add('two-item select', () => (
    <Select placeholder="Genre" style={inputStyle}>
      <SelectItem label="Java" value="java" />
      <SelectItem label="JavaScript" value="js" />
    </Select>
  ))
  .add('two-item select with custom InputButton', () => {
    return (
      <Select placeholder="Genre" style={inputStyle} InputButtonComponent={CustomBasicInputButtonComponent}>
        <SelectItem label="Java" value="java" />
        <SelectItem label="JavaScript" value="js" />
      </Select>
    );
  })
  .add('many-items select', () => (
    <Select placeholder="Nationalité" style={inputStyle}>
      {NATIONALITY_SELECT_ITEMS.map(option => (
        <SelectItem key={option.value} {...option} />
      ))}
    </Select>
  ))
  .add('many-items select inside a ScrollView', () => (
    <ScrollView style={{flex: 1}}>
      <Select placeholder="Nationalité" style={inputStyle}>
        {NATIONALITY_SELECT_ITEMS.map(option => (
          <SelectItem key={option.value} {...option} />
        ))}
      </Select>
    </ScrollView>
  ))
  .add('many-items select with async selectedValue', () => {
    const [value, setValue] = useState();
    useEffect(() => {
      setTimeout(() => {
        setValue('jp');
      }, 200);
    }, []);
    return (
      <Select placeholder="Nationalité" style={inputStyle} value={value} onValueChange={setValue}>
        {NATIONALITY_SELECT_ITEMS.map(option => (
          <SelectItem key={option.value} {...option} />
        ))}
      </Select>
    );
  });
