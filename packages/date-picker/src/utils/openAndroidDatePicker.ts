import {
  DatePickerAndroidOpenOptions,
  DatePickerAndroidOpenReturn,
  DatePickerIOSProps,
  TimePickerAndroidOpenOptions,
  TimePickerAndroidOpenReturn
} from 'react-native';
import DatePickerAndroid from '@react-native-community/datetimepicker/src/datepicker.android';
import TimePickerAndroid from '@react-native-community/datetimepicker/src/timepicker.android';
import {AndroidNativeProps, IOSNativeProps} from '@react-native-community/datetimepicker';

export type OpenAndroidDatePickerOptions = {
  value: Date;
  display: AndroidNativeProps['display'];
};

export {DatePickerAndroid};

export const openDatePicker = async ({display, value}: OpenAndroidDatePickerOptions) => {
  const {action, year, month, day} = (await DatePickerAndroid.open({
    display,
    value: value
  })) as DatePickerAndroidOpenReturn & {year: number; month: number; day: number};
  let nextValue;
  if (action !== DatePickerAndroid.dismissedAction) {
    // @NOTE aligned with iOS implementation
    nextValue = new Date(value.getTime());
    nextValue.setFullYear(year);
    nextValue.setMonth(month);
    nextValue.setDate(day);
    nextValue.setMilliseconds(0);
  }
  return {action, value: nextValue};
};

export const openTimePicker = async ({display, value}: OpenAndroidDatePickerOptions) => {
  const {action, minute, hour} = (await TimePickerAndroid.open({
    display,
    hour: value.getHours(),
    minute: value.getMinutes()
  })) as TimePickerAndroidOpenReturn & {minute: number; hour: number};
  let nextValue;
  if (action !== DatePickerAndroid.dismissedAction) {
    // @NOTE aligned with iOS implementation
    nextValue = new Date(value.getTime());
    nextValue.setHours(hour);
    nextValue.setMinutes(minute);
    nextValue.setMilliseconds(0);
  }
  return {action, value: nextValue};
};

export const openAndroidDatePicker = async (
  mode: IOSNativeProps['mode'],
  {display, value}: OpenAndroidDatePickerOptions
) => {
  switch (mode) {
    case 'date': {
      return openDatePicker({display, value});
    }
    case 'time': {
      return openTimePicker({display, value});
    }
    case 'datetime': {
      const {action: dateAction, value: nextDateValue} = await openDatePicker({display, value});
      if (dateAction === DatePickerAndroid.dismissedAction) {
        return {action: DatePickerAndroid.dismissedAction, value: undefined};
      }
      const {action, value: nextValue} = await openTimePicker({display, value: nextDateValue as Date});
      if (action === DatePickerAndroid.dismissedAction) {
        return {action: DatePickerAndroid.dismissedAction, value: undefined};
      }
      return {action, value: nextValue};
    }
    default:
      throw new Error(`Unsupported prop <DatePicker mode="${mode}" />`);
  }
};
