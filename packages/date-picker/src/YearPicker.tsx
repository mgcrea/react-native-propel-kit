import React, {useMemo, forwardRef, RefForwardingComponent} from 'react';
import Select, {SelectItem, SelectProps} from '@mgcrea/react-native-select';
import {InputButton} from '@mgcrea/react-native-button';

import {LabelExtractorOptions} from './utils/defaultLabelExtractor';

const CURRENT_YEAR = new Date().getFullYear();

export type Props = SelectProps & {
  onChange?: (value: number) => void;
  labelExtractor?: (value: number, options: LabelExtractorOptions) => string;
  minValue?: number;
  maxValue?: number;
  locale?: string;
};

export type Handle = {
  focus: () => void;
};

export const defaultProps = {
  initialValue: CURRENT_YEAR,
  InputButtonComponent: InputButton,
  labelExtractor: (value: number) => `${value}`,
  locale: navigator.language,
  minValue: CURRENT_YEAR - 50,
  maxValue: CURRENT_YEAR + 20
};

const YearPicker: RefForwardingComponent<Handle, Props> = (
  {
    initialValue: propInitialValue = defaultProps.initialValue,
    InputButtonComponent = defaultProps.InputButtonComponent,
    labelExtractor = defaultProps.labelExtractor,
    locale = defaultProps.locale,
    minValue = defaultProps.minValue,
    maxValue = defaultProps.maxValue,
    ...otherSelectProps
  },
  ref
) => {
  const yearOptions = useMemo(() => {
    const options = [];
    for (let value = minValue; value <= maxValue; value += 1) {
      options.push({label: labelExtractor ? labelExtractor(value, {mode: 'year', locale}) : `${value}`, value});
    }
    return options;
  }, [locale, minValue, maxValue]);
  return (
    <Select InputButtonComponent={InputButtonComponent} initialValue={propInitialValue} ref={ref} {...otherSelectProps}>
      {yearOptions.map(({label, value}) => (
        <SelectItem key={value} label={label} value={value} />
      ))}
    </Select>
  );
};

// export default YearPicker;
export default forwardRef<Handle, Props>(YearPicker);
