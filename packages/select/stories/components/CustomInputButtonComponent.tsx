import React, {FunctionComponent, useCallback} from 'react';
import {View, Text, ViewProps, TextInputProps, TouchableWithoutFeedback} from 'react-native';

export const CustomInputButtonComponent: FunctionComponent<TextInputProps> = ({value, onFocus, placeholder}) => {
  const handlePress = useCallback(
    (ev) => {
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
