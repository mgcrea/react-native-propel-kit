import React, {FunctionComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const DebugDateValue: FunctionComponent<{value: Date}> = ({value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {value.toISOString()}
        {'\n'}
        {value.toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#ccc',
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 12
  },
  text: {
    fontFamily: 'Menlo',
    color: '#333',
    textAlign: 'center',
    fontSize: 11
  }
});
