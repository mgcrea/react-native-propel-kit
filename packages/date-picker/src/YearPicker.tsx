import React, {useMemo, forwardRef, RefForwardingComponent} from 'react';
import Select, {Item as SelectItem, Props as SelectItemProps} from './Select';
import {Props as FormItemProps} from './FormItem';

const CURRENT_YEAR = new Date().getFullYear();

type Props = FormItemProps &
  SelectItemProps & {
    minValue?: number;
    maxValue?: number;
    labelPrefix?: string;
  };

export type Handle = {
  focus: () => void;
};

const YearPicker: RefForwardingComponent<Handle, Props> = (
  {
    initialValue = CURRENT_YEAR,
    maxValue = CURRENT_YEAR + 1,
    minValue = CURRENT_YEAR - 50,
    placeholder = 'Year',
    labelPrefix = '',
    ...otherProps
  },
  ref
) => {
  const yearOptions = useMemo(() => {
    const options = [];
    for (let i = minValue; i <= maxValue; i += 1) {
      options.push({label: `${labelPrefix}${i}`, value: i});
    }
    return options;
  }, [minValue, maxValue]);
  return (
    <Select placeholder={placeholder} initialValue={initialValue} ref={ref} {...otherProps}>
      {yearOptions.map(({label, value}) => (
        <SelectItem key={value} label={label} value={value} />
      ))}
    </Select>
  );
};

// export default YearPicker;
export default forwardRef<Handle, Props>(YearPicker);
