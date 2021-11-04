import React, {FunctionComponent} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export type CenteredViewProps = ViewProps;

export const CenteredView: FunctionComponent<CenteredViewProps> = ({children, style, ...viewProps}) => {
  return (
    <View style={[styles.view, style]} {...viewProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 64
  }
});
