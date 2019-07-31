import React, {
  ReactElement,
  useMemo,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  RefForwardingComponent,
  forwardRef,
  ReactNode,
  useEffect
} from 'react';
// import {Picker} from 'react-native';
import Picker, {Item as PickerItem} from './Picker';
import InputButton from './InputButton';
import ModalInput, {Handle as ModalInputHandle} from './ModalInput';
import {Props as FormItemProps} from './FormItem';
import dayjs from 'dayjs';

const isUndefined = (maybeUndefined: any): maybeUndefined is undefined => typeof maybeUndefined === 'undefined';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date(Date.UTC(CURRENT_YEAR, 0, 1));
const DATEPICKER_MONTHS = [
  {label: 'Janvier', value: 0},
  {label: 'Février', value: 1},
  {label: 'Mars', value: 2},
  {label: 'Avril', value: 3},
  {label: 'Mai', value: 4},
  {label: 'Juin', value: 5},
  {label: 'Juillet', value: 6},
  {label: 'Août', value: 7},
  {label: 'Septembre', value: 8},
  {label: 'Octobre', value: 9},
  {label: 'Novembre', value: 10},
  {label: 'Décembre', value: 11}
];

type MonthPickerValue = Date;

export type Props = FormItemProps & {
  cancelTitle?: string;
  children?: ReactNode;
  confirmTitle?: string;
  initialValue?: MonthPickerValue;
  onValueChange?: (value: MonthPickerValue) => void;
  onSubmitEditing?: (value: MonthPickerValue) => void;
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
  value?: MonthPickerValue;
};

export type Handle = {
  focus: () => void;
};
const MonthPicker: RefForwardingComponent<Handle, Props> = (
  {
    cancelTitle,
    children,
    confirmTitle,
    format = 'MM/YYYY',
    initialValue: propInitialValue = CURRENT_MONTH,
    onValueChange: propOnValueChange,
    onSubmitEditing,
    placeholder,
    value: propValue,
    minYear = CURRENT_YEAR - 50,
    maxYear = CURRENT_YEAR + 1,
    ...otherProps
  },
  ref
) => {
  const modalInputRef = useRef<ModalInputHandle>(null);
  const [localValue, setLocalValue] = useState<MonthPickerValue>();
  const [modalMonthValue, setModalMonthValue] = useState<number>(propInitialValue.getMonth());
  const latestModalMonthValue = useRef(modalMonthValue);
  const [modalYearValue, setModalYearValue] = useState<number>(propInitialValue.getFullYear());
  const latestModalYearValue = useRef(modalYearValue);

  // Track actual checked value
  const inputValue = !isUndefined(propValue) ? propValue : localValue;

  // Catch-up for propValue changes
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

  // Open the modal when user touches input
  const focus = useCallback(() => {
    if (modalInputRef.current) {
      modalInputRef.current.show();
    }
  }, []);

  // Expose API via an imperative handle
  useImperativeHandle(ref, () => ({focus}), [focus]);

  // Propagate changed value
  const onConfirm = useCallback(() => {
    const nextValue = new Date(Date.UTC(modalYearValue, modalMonthValue));
    if (propOnValueChange) {
      propOnValueChange(nextValue);
    }
    if (onSubmitEditing) {
      // @NOTE Add a timeout to prevent swallowing siblings focus events
      setTimeout(() => {
        onSubmitEditing(nextValue);
      });
    }
    // Support uncontrolled usage
    setLocalValue(nextValue);
  }, [modalYearValue, modalMonthValue, onSubmitEditing, propOnValueChange]);

  // Reset modalValue to the proper value
  const onCancel = useCallback(() => {
    setModalMonthValue((inputValue || propInitialValue).getMonth());
    setModalYearValue((inputValue || propInitialValue).getFullYear());
  }, [inputValue, propInitialValue]);

  // Lazily compute displayed label
  const labelValue = useMemo(() => {
    if (isUndefined(inputValue)) {
      return '';
    }
    return dayjs(inputValue).format(format);
  }, [format, inputValue]);

  // Lazily compute year options
  const yearOptions = useMemo(() => {
    const options = [];
    for (let i = minYear; i <= maxYear; i += 1) {
      options.push({label: `${i}`, value: i});
    }
    return options;
  }, [minYear, maxYear]);
  console.warn({yearOptions});

  return (
    <>
      <InputButton onFocus={focus} placeholder={placeholder} value={labelValue} {...otherProps} />
      <ModalInput
        ref={modalInputRef}
        title={placeholder}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmTitle={confirmTitle}
        cancelTitle={cancelTitle}
      >
        <Picker style={{flex: 1}} onValueChange={setModalMonthValue} selectedValue={modalMonthValue}>
          {DATEPICKER_MONTHS.map(({label, value}) => (
            <PickerItem key={value} label={label} value={value} />
          ))}
        </Picker>
        <Picker style={{flex: 1}} onValueChange={setModalYearValue} selectedValue={modalYearValue}>
          {yearOptions.map(({label, value}) => (
            <PickerItem key={value} label={label} value={value} />
          ))}
        </Picker>
      </ModalInput>
    </>
  );
};

export default forwardRef(MonthPicker);

export const Item = Picker.Item; // eslint-disable-line prefer-destructuring
