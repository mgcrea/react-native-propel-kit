import {
  DatePickerAndroid,
  DatePickerAndroidOpenOptions,
  DatePickerAndroidOpenReturn,
  DatePickerIOSProps,
  TimePickerAndroid,
  TimePickerAndroidOpenOptions,
  TimePickerAndroidOpenReturn
} from 'react-native';

type OpenAndroidDatePickerOptions = {
  prevValue: Date;
  androidMode: DatePickerAndroidOpenOptions['mode'] | TimePickerAndroidOpenOptions['mode'];
};

const openDatePicker = async ({androidMode, prevValue}: OpenAndroidDatePickerOptions) => {
  const {action, year, month, day} = (await DatePickerAndroid.open({
    mode: androidMode as DatePickerAndroidOpenOptions['mode'],
    date: prevValue
  })) as DatePickerAndroidOpenReturn & {year: number; month: number; day: number};
  let nextValue;
  if (action !== DatePickerAndroid.dismissedAction) {
    // @NOTE aligned with iOS implementation
    nextValue = new Date(prevValue.getTime());
    nextValue.setFullYear(year);
    nextValue.setMonth(month);
    nextValue.setDate(day);
    nextValue.setMilliseconds(0);
  }
  return {action, value: nextValue};
};

const openTimePicker = async ({androidMode, prevValue}: OpenAndroidDatePickerOptions) => {
  const {action, minute, hour} = (await TimePickerAndroid.open({
    mode: androidMode as TimePickerAndroidOpenOptions['mode'],
    hour: prevValue.getHours(),
    minute: prevValue.getMinutes()
  })) as TimePickerAndroidOpenReturn & {minute: number; hour: number};
  let nextValue;
  if (action !== DatePickerAndroid.dismissedAction) {
    // @NOTE aligned with iOS implementation
    nextValue = new Date(prevValue.getTime());
    nextValue.setHours(hour);
    nextValue.setMinutes(minute);
    nextValue.setMilliseconds(0);
  }
  return {action, value: nextValue};
};

const openAndroidDatePicker = async (
  mode: DatePickerIOSProps['mode'],
  {androidMode, prevValue}: OpenAndroidDatePickerOptions
) => {
  switch (mode) {
    case 'date': {
      return openDatePicker({androidMode, prevValue});
    }
    case 'time': {
      return openTimePicker({androidMode, prevValue});
    }
    case 'datetime': {
      const {action: dateAction, value: nextDateValue} = await openDatePicker({androidMode, prevValue});
      if (dateAction === DatePickerAndroid.dismissedAction) {
        return {action: DatePickerAndroid.dismissedAction, value: undefined};
      }
      const {action, value: nextValue} = await openTimePicker({androidMode, prevValue: nextDateValue as Date});
      if (action === DatePickerAndroid.dismissedAction) {
        return {action: DatePickerAndroid.dismissedAction, value: undefined};
      }
      return {action, value: nextValue};
    }
    default:
      throw new Error(`Unsupported prop <DatePicker mode="${mode}" />`);
  }
};

export default openAndroidDatePicker;
