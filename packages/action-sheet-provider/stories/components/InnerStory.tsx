import React, {FunctionComponent} from 'react';
import {StyleSheet, View, Text, ViewProps} from 'react-native';

export type InnerStoryProps = ViewProps & {legend?: string};

export const InnerStory: FunctionComponent<InnerStoryProps> = ({children, style, legend, ...viewProps}) => {
  return (
    <View style={[styles.view, style]} {...viewProps}>
      {legend ? <Text style={styles.legend}>{legend}</Text> : null}
      {children}
    </View>
  );
};

export default InnerStory;

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    marginBottom: 24
  },
  legend: {
    color: '#999',
    position: 'absolute',
    top: -18
  }
});
