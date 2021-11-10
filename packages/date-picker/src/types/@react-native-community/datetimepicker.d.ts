type DateTimePickerResult = Readonly<{
  action: 'timeSetAction' | 'dateSetAction' | 'dismissedAction';
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}>;

type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
type Display = 'default' | 'spinner' | 'clock' | 'calendar';

declare module '@react-native-community/datetimepicker/src/datepicker.android' {
  export type DatePickerOptions = {
    value?: Date;
    minimumDate?: Date;
    maximumDate?: Date;
    display?: Display;
  };
  declare class DatePickerAndroid {
    static dismissedAction: string;
    static open(options: DatePickerOptions): Promise<DateTimePickerResult>;
  }
  export default DatePickerAndroid;
}
declare module '@react-native-community/datetimepicker/src/timepicker.android' {
  export type TimePickerOptions = {
    value?: Date;
    minuteInterval?: MinuteInterval;
    display?: Display;
    is24Hour?: boolean;
  };
  declare class TimePickerAndroid {
    static dismissedAction: string;
    static open(options: TimePickerOptions): Promise<DateTimePickerResult>;
  }
  export default TimePickerAndroid;
}
