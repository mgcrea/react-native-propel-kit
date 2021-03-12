import Picker from '@mgcrea/react-native-picker';
import {Select, defaultProps as selectDefaultProps, SelectProps} from './Select';

export {selectDefaultProps};
export type {SelectProps};
export default Object.assign(Select, {Item: Picker.Item});
