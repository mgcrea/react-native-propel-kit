import React, {FunctionComponent} from 'react';
import {StyleSheet, View, Text, ViewProps} from 'react-native';

export type InnerStoryProps = ViewProps & {legend?: string};

export const InnerStory: FunctionComponent<InnerStoryProps> = ({children, style, legend, ...viewProps}) => {
  return (
    <View style={[styles.view, style]} {...viewProps}>
      {legend ? <Text style={styles.legend}>{legend}</Text> : null}
      <View style={[styles.content, style]}>{children}</View>
    </View>
  );
};

export default InnerStory;

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    padding: 12,
    marginBottom: 12,
    width: '100%'
  },
  content: {
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  },
  legend: {
    fontFamily: 'Menlo',
    color: '#333',
    textAlign: 'center',
    fontSize: 11
  }
});
