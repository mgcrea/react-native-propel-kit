import {ReactNode, ElementType} from 'react';
import {
  DatePickerAndroidOpenOptions,
  TimePickerAndroidOpenOptions,
  DatePickerIOSProps,
  TextInputProps
} from 'react-native';
import {InputButton} from '@mgcrea/react-native-button';
import defaultLabelExtractor, {LabelExtractorOptions} from './utils/defaultLabelExtractor';

const CURRENT_YEAR = new Date().getFullYear();
const FIRST_DAY_OF_YEAR = new Date(Date.UTC(CURRENT_YEAR, 0, 1));

type Defaults = {
  androidMode: DatePickerAndroidOpenOptions['mode'] | TimePickerAndroidOpenOptions['mode'];
  initialValue: Date;
  InputButtonComponent: ElementType<TextInputProps>;
  labelExtractor: (value: Date, options: LabelExtractorOptions) => string;
  mode: DatePickerIOSProps['mode'];
  utc: boolean;
};

const defaults: Defaults = {
  androidMode: 'spinner',
  initialValue: FIRST_DAY_OF_YEAR,
  InputButtonComponent: InputButton,
  labelExtractor: defaultLabelExtractor,
  mode: 'date',
  utc: false
};

export default defaults;
