import {DatePickerIOSProps} from 'react-native';

export type AsUTCDateOptions = {mode: DatePickerIOSProps['mode'] | 'month'};

const asUTCDate = (value: Date, {mode}: AsUTCDateOptions): Date => {
  switch (mode) {
    case 'date':
      return new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
    case 'time':
      return new Date(Date.UTC(1970, 0, 1, value.getHours(), value.getMinutes()));
    case 'datetime':
      return new Date(
        Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes())
      );
    case 'month':
      return new Date(Date.UTC(value.getFullYear(), value.getMonth()));
    default:
      return value;
  }
};

export default asUTCDate;
