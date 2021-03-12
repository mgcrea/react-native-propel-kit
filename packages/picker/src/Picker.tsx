// @see https://github.com/lawnstarter/react-native-picker-select/blob/master/src/index.js

import {Picker as BasePicker, Platform} from 'react-native';
import {AndroidPicker, defaultProps, AndroidPickerProps as PickerProps} from './AndroidPicker';
import {AndroidPickerItem} from './AndroidPickerItem';

const IS_IOS = Platform.OS === 'ios';

export const Picker = IS_IOS ? BasePicker : Object.assign(AndroidPicker, {Item: AndroidPickerItem});

export const Item: typeof BasePicker.Item = IS_IOS
  ? BasePicker.Item
  : ((AndroidPickerItem as unknown) as typeof BasePicker.Item);

export {defaultProps};
export type {PickerProps};
