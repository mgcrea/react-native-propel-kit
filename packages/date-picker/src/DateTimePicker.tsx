import React, {RefForwardingComponent} from 'react';
import DatePicker, {Handle, Props} from './DatePicker';

export {Props};

const DateTimePicker: RefForwardingComponent<Handle, Props> = ({mode = 'datetime', ...otherProps}) => (
  <DatePicker mode={mode} {...otherProps} />
);

export default DateTimePicker;
