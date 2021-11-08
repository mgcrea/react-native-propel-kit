import {IOSNativeProps} from '@react-native-community/datetimepicker';

export const asUTCDate = (date: Date) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );

export const asLocaleDate = (date: Date) =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  );

export type StartOfDate = 'day' | 'month' | 'year';
export const asStartOfDate = (date: Date, startOf: StartOfDate): Date => {
  switch (startOf) {
    case 'day':
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    case 'month':
      return new Date(date.getFullYear(), date.getMonth());
    case 'year':
      return new Date(date.getFullYear(), 0);
    default:
      return date;
  }
};

export type DateMode = IOSNativeProps['mode'] | 'month';
export const trimDate = (date: Date, mode: DateMode): Date => {
  switch (mode) {
    case 'date':
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    case 'time':
      return new Date(1970, 0, 1, date.getHours(), date.getMinutes());
    case 'datetime':
      return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())
      );
    case 'month':
      return new Date(Date.UTC(date.getFullYear(), date.getMonth()));
    default:
      return date;
  }
};
