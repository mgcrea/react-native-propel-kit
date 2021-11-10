import {AndroidNativeProps, IOSNativeProps} from '@react-native-community/datetimepicker';
import DatePickerAndroid from '@react-native-community/datetimepicker/src/datepicker.android';
import TimePickerAndroid from '@react-native-community/datetimepicker/src/timepicker.android';
import {DatePickerAndroidOpenReturn, TimePickerAndroidOpenReturn} from 'react-native';
import {asLocaleDate, asUTCDate} from './date';

export type OpenAndroidDatePickerOptions = {
  value: Date;
  display: AndroidNativeProps['display'];
  utc: boolean;
};

export {DatePickerAndroid};

export const openDatePicker = async ({display, value, utc}: OpenAndroidDatePickerOptions) => {
  const pickerValue = utc ? asLocaleDate(value) : value;
  const {action, year, month, day} = (await DatePickerAndroid.open({
    display,
    value: pickerValue
  })) as DatePickerAndroidOpenReturn & {year: number; month: number; day: number};
  let nextValue;
  if (action !== DatePickerAndroid.dismissedAction) {
    // @NOTE aligned with iOS implementation
    nextValue = new Date(value.getTime());
    nextValue.setFullYear(year);
    nextValue.setMonth(month);
    nextValue.setDate(day);
    nextValue.setMilliseconds(0);
    nextValue = utc ? asLocaleDate(nextValue) : nextValue;
  }
  return {action, value: nextValue};
};

export const openTimePicker = async ({display, value, utc}: OpenAndroidDatePickerOptions) => {
  const pickerValue = utc ? asLocaleDate(value) : value;
  const {action, minute, hour} = (await TimePickerAndroid.open({
    display,
    value: pickerValue,
    is24Hour: true
  })) as TimePickerAndroidOpenReturn & {minute: number; hour: number};
  let nextValue;
  if (action !== TimePickerAndroid.dismissedAction) {
    // @NOTE aligned with iOS implementation
    nextValue = new Date(value.getTime());
    nextValue.setHours(hour);
    nextValue.setMinutes(minute);
    nextValue.setMilliseconds(0);
    nextValue = utc ? asLocaleDate(nextValue) : nextValue;
  }
  return {action, value: nextValue};
};

export const openAndroidDatePicker = async (mode: IOSNativeProps['mode'], options: OpenAndroidDatePickerOptions) => {
  switch (mode) {
    case 'date': {
      return openDatePicker(options);
    }
    case 'time': {
      return openTimePicker(options);
    }
    case 'datetime': {
      const {action: dateAction, value: nextDateValue} = await openDatePicker(options);
      if (dateAction === DatePickerAndroid.dismissedAction || !nextDateValue) {
        return {action: DatePickerAndroid.dismissedAction, value: undefined};
      }
      const pickerNextDateValue = options.utc ? asUTCDate(nextDateValue) : nextDateValue;
      const {action, value: nextValue} = await openTimePicker({...options, value: pickerNextDateValue});
      if (action === TimePickerAndroid.dismissedAction) {
        return {action: TimePickerAndroid.dismissedAction, value: undefined};
      }
      return {action, value: nextValue};
    }
    default:
      throw new Error(`Unsupported prop <DatePicker mode="${mode}" />`);
  }
};
