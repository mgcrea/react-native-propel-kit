import {InputButton, InputButtonProps} from '@mgcrea/react-native-button';
import ModalDialog, {ModalDialogHandle, ModalDialogProps} from '@mgcrea/react-native-modal-dialog';
import {Picker} from '@react-native-picker/picker';
import React, {
  ElementType,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {DatePickerIOSProps} from 'react-native';
import {
  asLocaleDate,
  asUTCDate,
  defaultLabelExtractor,
  getNavigatorLocale,
  isUndefined,
  LabelExtractorOptions,
  localizedMonths,
  trimDate
} from './utils';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth();
const START_OF_MONTH = new Date(Date.UTC(CURRENT_YEAR, CURRENT_MONTH, 1));

type MonthPickerValue = Date;

export type MonthPickerHandle = {
  focus: () => void;
};

export type MonthPickerProps = Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> &
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
    trim?: boolean;
    [s: string]: unknown; // otherInputButtonProps
  };

export const defaultProps: Required<
  Pick<MonthPickerProps, 'initialValue' | 'InputButtonComponent' | 'labelExtractor' | 'locale' | 'utc' | 'trim'>
> = {
  initialValue: START_OF_MONTH,
  InputButtonComponent: InputButton,
  labelExtractor: defaultLabelExtractor,
  locale: getNavigatorLocale(),
  utc: false,
  trim: false
};

export const MonthPicker = forwardRef<MonthPickerHandle, MonthPickerProps>(
  (
    {
      // ModalDialog props
      cancelTitle,
      confirmTitle,
      title,
      // InputButton props
      placeholder,
      // MonthPicker props
      initialValue = defaultProps.initialValue,
      InputButtonComponent = defaultProps.InputButtonComponent,
      labelExtractor = defaultProps.labelExtractor,
      locale = defaultProps.locale,
      utc = defaultProps.utc,
      onChange: propOnChange,
      onSubmitEditing,
      value: propValue,
      trim,
      minYear = CURRENT_YEAR - 100,
      maxYear = CURRENT_YEAR + 10,
      ...otherInputButtonProps
    },
    ref
  ) => {
    const value = propValue || initialValue;
    const [modalMonthValue, setModalMonthValue] = useState<number>(initialValue.getMonth());
    const [modalYearValue, setModalYearValue] = useState<number>(initialValue.getFullYear());

    // Track parent propValue controlled updates
    useEffect(() => {
      const nextValue = utc ? asLocaleDate(value) : value;
      setModalMonthValue(nextValue.getMonth());
      setModalYearValue(nextValue.getFullYear());
    }, [value]);

    // Support both controlled/uncontrolled usage
    const [localValue, setLocalValue] = useState<MonthPickerValue>(initialValue);
    const inputValue = useMemo(() => (!isUndefined(propValue) ? propValue : localValue), [propValue, localValue]);

    // Lazily compute displayed label
    const labelValue = useMemo<string>(() => {
      if (isUndefined(inputValue)) {
        return '';
      }
      if (labelExtractor) {
        return labelExtractor(inputValue, {mode: 'month', locale, utc});
      }
      return `${inputValue}`;
    }, [labelExtractor, inputValue, locale]);

    const computeDate = (modalYearValue: number, modalMonthValue: number) => {
      let nextValue = new Date(
        modalYearValue,
        modalMonthValue,
        value.getDate(),
        value.getHours(),
        value.getMinutes(),
        value.getSeconds(),
        value.getMilliseconds()
      );
      console.warn({nextValue});
      if (trim) {
        nextValue = trimDate(nextValue, 'month');
      }
      if (utc) {
        nextValue = asUTCDate(nextValue);
      }
      return nextValue;
    };

    // Propagate changed value
    const onConfirm = useCallback(() => {
      const nextValue = computeDate(modalYearValue, modalMonthValue);
      if (propOnChange) {
        propOnChange(nextValue);
      }
      if (onSubmitEditing) {
        // @NOTE Add a timeout to prevent swallowing siblings focus events
        setTimeout(() => {
          onSubmitEditing(nextValue);
        });
      }
      // Support uncontrolled usage
      setLocalValue(nextValue);
    }, [modalYearValue, modalMonthValue, onSubmitEditing, utc, propOnChange]);

    // Reset modalValue to the proper value
    const onCancel = useCallback(() => {
      setModalMonthValue((inputValue || initialValue).getMonth());
      setModalYearValue((inputValue || initialValue).getFullYear());
    }, [inputValue, initialValue]);

    // Lazily compute year options
    const yearOptions = useMemo(() => {
      const options = [];
      for (let i = minYear; i <= maxYear; i += 1) {
        options.push({label: `${i}`, value: i});
      }
      return options;
    }, [minYear, maxYear]);

    // Open the modal when user touches input
    const modalDialogRef = useRef<ModalDialogHandle>(null);
    const focus = useCallback(() => {
      if (modalDialogRef.current) {
        modalDialogRef.current.show();
      }
    }, []);
    // Expose API via an imperative handle
    useImperativeHandle(ref, () => ({focus}), [focus]);

    // Track modal value updates
    const onMonthValueChange = useCallback((value) => setModalMonthValue(value), []);
    const onYearValueChange = useCallback((value) => setModalYearValue(value), []);

    // Compute localized values
    const pickerValues = useMemo(() => {
      const lang = locale.split('-')[0];
      const months = localizedMonths[lang] || localizedMonths.en;
      return months.map((label, value) => ({label, value}));
    }, [locale]);

    return (
      <>
        <InputButtonComponent onFocus={focus} placeholder={placeholder} value={labelValue} {...otherInputButtonProps} />
        <ModalDialog
          ref={modalDialogRef}
          title={title || placeholder}
          onConfirm={onConfirm}
          onCancel={onCancel}
          confirmTitle={confirmTitle}
          cancelTitle={cancelTitle}
          bodyStyle={{flexDirection: 'row'}}
        >
          <Picker
            style={{flexBasis: '50%', flexGrow: 0, flexShrink: 0}}
            onValueChange={onMonthValueChange}
            selectedValue={modalMonthValue}
          >
            {pickerValues.map(({label, value}) => (
              <Picker.Item key={value} label={label} value={value} />
            ))}
          </Picker>
          <Picker
            style={{flexBasis: '50%', flexGrow: 0, flexShrink: 0}}
            onValueChange={onYearValueChange}
            selectedValue={modalYearValue}
          >
            {yearOptions.map(({label, value}) => (
              <Picker.Item key={value} label={label} value={value} />
            ))}
          </Picker>
        </ModalDialog>
      </>
    );
  }
);

export const MonthPickerItem = Picker.Item;
