import {DatePickerIOSProps} from 'react-native';

export type LabelExtractorOptions = Pick<DatePickerIOSProps, 'mode' | 'locale'>;

const withoutSeconds = (localeString: string): string => localeString.replace(/(.*):\d+(.*)/, '$1$2');

const defaultLabelExtractor = (value: Date, {mode, locale}: LabelExtractorOptions): string => {
  switch (mode) {
    case 'date':
      return value.toLocaleDateString(locale);
    case 'time':
      return withoutSeconds(value.toLocaleTimeString(locale));
    case 'datetime':
      return withoutSeconds(value.toLocaleString(locale));
    default:
      return '';
  }
};

export default defaultLabelExtractor;
