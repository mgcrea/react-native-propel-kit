// @see https://github.com/lawnstarter/react-native-picker-select/blob/master/src/index.js

import {Picker, Platform} from 'react-native';
import AndroidPicker, {defaultProps, Props} from './AndroidPicker';
import AndroidPickerItem from './AndroidPickerItem';

const IS_IOS = Platform.OS === 'ios';

export default IS_IOS ? Picker : AndroidPicker;

export const Item: typeof Picker.Item = IS_IOS ? Picker.Item : ((AndroidPickerItem as unknown) as typeof Picker.Item);

export {defaultProps, Props};
