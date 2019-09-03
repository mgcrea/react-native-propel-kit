import {StyleSheet} from 'react-native';
import {buttonDefaultProps, inputButtonDefaultProps} from '@mgcrea/react-native-button';

Object.assign(buttonDefaultProps.viewStyle, {
  backgroundColor: 'white',
  borderRadius: 4,
  elevation: 4,
  minWidth: 200
});

Object.assign(buttonDefaultProps.textStyle, {
  color: 'black',
  padding: 12,
  fontSize: 18
  // textTransform: 'uppercase',
  // fontWeight: 'bold'
});

Object.assign(inputButtonDefaultProps.viewStyle, {
  backgroundColor: 'white',
  marginBottom: 12,
  borderRadius: 4,
  elevation: 4,
  minWidth: 200,
  borderColor: '#C5CAE9',
  borderWidth: StyleSheet.hairlineWidth
});

inputButtonDefaultProps.textStyle = {
  color: 'black',
  padding: 12,
  fontSize: 18
  // textTransform: 'uppercase',
  // fontWeight: 'bold'
};
