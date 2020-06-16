import React, {RefForwardingComponent} from 'react';
import DatePicker, {Handle, Props} from './DatePicker';

export {Props};

const TimePicker: RefForwardingComponent<Handle, Props> = ({mode = 'time', ...otherProps}) => (
  <DatePicker mode={mode} {...otherProps} />
);

export default TimePicker;
