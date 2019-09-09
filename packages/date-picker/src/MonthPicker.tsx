import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  RefForwardingComponent,
  forwardRef,
  ReactNode,
  useEffect,
  ElementType
} from 'react';
import Picker from '@mgcrea/react-native-picker';
import ModalDialog, {ModalDialogProps, ModalDialogHandle} from '@mgcrea/react-native-modal-dialog';
import {InputButton, InputButtonProps} from '@mgcrea/react-native-button';
import {DatePickerIOSProps} from 'react-native';

import defaultLabelExtractor, {LabelExtractorOptions} from './utils/defaultLabelExtractor';
import isUndefined from './utils/isUndefined';
import asUTCDate from './utils/asUTCDate';
import localizedMonths from './utils/localizedMonths';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date(Date.UTC(CURRENT_YEAR, 0, 1));

type MonthPickerValue = Date;

export type Props = Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> &
  Pick<DatePickerIOSProps, 'locale'> & {
    children?: ReactNode;
    initialValue?: MonthPickerValue;
    InputButtonComponent?: ElementType<InputButtonProps>;
    labelExtractor?: (value: Date, options: LabelExtractorOptions) => string;
    onChange?: (value: MonthPickerValue) => void;
    onSubmitEditing?: (value: MonthPickerValue) => void;
    placeholder?: string;
    minYear?: number;
    maxYear?: number;
    value?: MonthPickerValue;
    utc?: boolean;
  };

export const defaultProps = {
  initialValue: CURRENT_MONTH,
  InputButtonComponent: InputButton,
  labelExtractor: defaultLabelExtractor,
  locale: navigator.language,
  utc: true
};

export type Handle = {
  focus: () => void;
};
const MonthPicker: RefForwardingComponent<Handle, Props> = (
  {
    children,
    // ModalDialog props
    cancelTitle,
    confirmTitle,
    title,
    // MonthPicker props
    initialValue: propInitialValue = defaultProps.initialValue,
    InputButtonComponent = defaultProps.InputButtonComponent,
    labelExtractor = defaultProps.labelExtractor,
    locale = defaultProps.locale,
    utc = defaultProps.utc,
    onChange: propOnChange,
    onSubmitEditing,
    placeholder,
    value: propValue,
    minYear = CURRENT_YEAR - 100,
    maxYear = CURRENT_YEAR + 10,
    ...otherProps
  },
  ref
) => {
  const modalInputRef = useRef<ModalDialogHandle>(null);
  const [localValue, setLocalValue] = useState<MonthPickerValue>();
  const [modalMonthValue, setModalMonthValue] = useState<number>(propInitialValue.getMonth());
  const latestModalMonthValue = useRef(modalMonthValue);
  const [modalYearValue, setModalYearValue] = useState<number>(propInitialValue.getFullYear());
  const latestModalYearValue = useRef(modalYearValue);

  // Support both controlled/uncontrolled usage
  const inputValue = useMemo(() => (!isUndefined(propValue) ? propValue : localValue), [propValue, localValue]);

  // Track parent propValue controlled updates
  useEffect(() => {
    if (!propValue) {
      setModalMonthValue(propInitialValue.getMonth());
      setModalYearValue(propInitialValue.getFullYear());
      return;
    }
    if (latestModalMonthValue.current !== propValue.getMonth()) {
      setModalMonthValue(propValue.getMonth());
    }
    if (latestModalYearValue.current !== propValue.getFullYear()) {
      setModalYearValue(propValue.getFullYear());
    }
  }, [propValue, propInitialValue]);

  // Lazily compute displayed label
  const labelValue = useMemo<string>(() => {
    if (isUndefined(inputValue)) {
      return '';
    }
    if (labelExtractor) {
      return labelExtractor(inputValue, {mode: 'month', locale});
    }
    return `${inputValue}`;
  }, [labelExtractor, inputValue, locale]);

  // Propagate changed value
  const onConfirm = useCallback(() => {
    const nextValue = new Date(modalYearValue, modalMonthValue);
    if (propOnChange) {
      propOnChange(utc ? asUTCDate(nextValue, {mode: 'month'}) : nextValue);
    }
    if (onSubmitEditing) {
      // @NOTE Add a timeout to prevent swallowing siblings focus events
      setTimeout(() => {
        onSubmitEditing(nextValue);
      });
    }
    // Support uncontrolled usage
    setLocalValue(nextValue);
  }, [modalYearValue, modalMonthValue, onSubmitEditing, propOnChange]);

  // Reset modalValue to the proper value
  const onCancel = useCallback(() => {
    setModalMonthValue((inputValue || propInitialValue).getMonth());
    setModalYearValue((inputValue || propInitialValue).getFullYear());
  }, [inputValue, propInitialValue]);

  // Lazily compute year options
  const yearOptions = useMemo(() => {
    const options = [];
    for (let i = minYear; i <= maxYear; i += 1) {
      options.push({label: `${i}`, value: i});
    }
    return options;
  }, [minYear, maxYear]);

  // Open the modal when user touches input
  const focus = useCallback(() => {
    if (modalInputRef.current) {
      modalInputRef.current.show();
    }
  }, []);

  // Expose API via an imperative handle
  useImperativeHandle(ref, () => ({focus}), [focus]);

  // Track modal value updates
  const onMonthValueChange = useCallback(value => setModalMonthValue(value), []);
  const onYearValueChange = useCallback(value => setModalYearValue(value), []);

  // Compute localized values
  const pickerValues = useMemo(() => {
    const lang = locale.split('-')[0];
    const months = localizedMonths[lang] || localizedMonths.en;
    return months.map((label, value) => ({label, value}));
  }, [locale]);

  return (
    <>
      <InputButtonComponent onFocus={focus} placeholder={placeholder} value={labelValue} {...otherProps} />
      <ModalDialog
        ref={modalInputRef}
        title={title}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmTitle={confirmTitle}
        cancelTitle={cancelTitle}
        bodyStyle={{flexDirection: 'row'}}>
        <Picker style={{flexGrow: 1}} onValueChange={onMonthValueChange} selectedValue={modalMonthValue}>
          {pickerValues.map(({label, value}) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
        <Picker style={{flexGrow: 1}} onValueChange={onYearValueChange} selectedValue={modalYearValue}>
          {yearOptions.map(({label, value}) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      </ModalDialog>
    </>
  );
};

export default forwardRef(MonthPicker);

export const Item = Picker.Item; // eslint-disable-line prefer-destructuring
