import {DatePickerIOSProps} from 'react-native';

export type LabelExtractorOptions = {
  mode: DatePickerIOSProps['mode'] | 'month' | 'year';
  locale: DatePickerIOSProps['locale'];
};

export const withoutSeconds = (localeString: string): string => localeString.replace(/(.*):\d+(.*)/, '$1$2');

export const defaultLabelExtractor = (value: Date, {mode, locale}: LabelExtractorOptions): string => {
  switch (mode) {
    case 'date':
      return value.toLocaleDateString(locale);
    case 'time':
      return withoutSeconds(value.toLocaleTimeString(locale));
    case 'datetime':
      return withoutSeconds(value.toLocaleString(locale));
    case 'month': {
      const month = value.getMonth() + 1;
      // @NOTE future: return value.toLocaleDateString(locale, {month: '2-digit', year: 'numeric'})
      return `${month < 10 ? `0${month}` : month}/${value.getFullYear()}`;
    }
    default:
      return '';
  }
};
