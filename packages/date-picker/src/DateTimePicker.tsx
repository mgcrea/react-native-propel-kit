import React, {forwardRef} from 'react';
import {DatePicker, DatePickerHandle, DatePickerProps} from './DatePicker';

export type DateTimePickerProps = DatePickerProps;
export type DateTimePickerHandle = DatePickerHandle;

export const DateTimePicker = forwardRef<DateTimePickerHandle, DateTimePickerProps>(
  ({mode = 'datetime', ...otherProps}, ref) => <DatePicker ref={ref} mode={mode} {...otherProps} />
);
