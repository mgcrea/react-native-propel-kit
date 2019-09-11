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
import {
  DatePickerIOS,
  Platform,
  DatePickerAndroid,
  DatePickerIOSProps,
  DatePickerAndroidOpenOptions,
  TimePickerAndroidOpenOptions,
  TextInputProps
} from 'react-native';

import ModalDialog, {ModalDialogProps, ModalDialogHandle} from '@mgcrea/react-native-modal-dialog';
import {InputButton, InputButtonProps} from '@mgcrea/react-native-button';

import defaultLabelExtractor, {LabelExtractorOptions} from './utils/defaultLabelExtractor';
import openAndroidDatePicker from './utils/openAndroidDatePicker';
import asUTCDate from './utils/asUTCDate';
import isUndefined from './utils/isUndefined';

export type Props = Pick<InputButtonProps, 'placeholder' | 'style'> &
  Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> &
  Pick<DatePickerIOSProps, 'mode' | 'locale'> & {
    children?: ReactNode;
    // DatePicker props
    initialValue?: Date;
    InputButtonComponent?: ElementType<InputButtonProps>;
    labelExtractor?: (value: Date, options: LabelExtractorOptions) => string;
    onChange?: (value: Date) => void;
    onSubmitEditing?: (value: Date) => void;
    value?: Date;
    utc?: boolean;
    androidMode?: DatePickerAndroidOpenOptions['mode'] | TimePickerAndroidOpenOptions['mode'];
    [s: string]: any; // otherInputButtonProps
  };

const CURRENT_YEAR = new Date().getFullYear();
const FIRST_DAY_OF_YEAR = new Date(Date.UTC(CURRENT_YEAR, 0, 1));

export const defaultProps = {
  androidMode: 'spinner' as DatePickerAndroidOpenOptions['mode'] | TimePickerAndroidOpenOptions['mode'],
  initialValue: FIRST_DAY_OF_YEAR,
  InputButtonComponent: InputButton,
  labelExtractor: defaultLabelExtractor,
  locale: navigator.language,
  mode: 'date' as DatePickerIOSProps['mode'],
  utc: false
};

export type Handle = {
  focus: () => void;
};

const DatePicker: RefForwardingComponent<Handle, Props> = (
  {
    children,
    // ModalDialog props
    cancelTitle,
    confirmTitle,
    title,
    // DatePicker props
    androidMode = defaultProps.androidMode,
    initialValue: propInitialValue = defaultProps.initialValue,
    InputButtonComponent = defaultProps.InputButtonComponent,
    labelExtractor = defaultProps.labelExtractor,
    locale = defaultProps.locale,
    mode = defaultProps.mode,
    utc = defaultProps.utc,
    onChange: propOnChange,
    onSubmitEditing,
    value: propValue,
    ...otherInputButtonProps
  },
  ref
) => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  const [modalValue, setModalValue] = useState<Date>(propInitialValue);
  const [localValue, setLocalValue] = useState<Date>();

  // Support both controlled/uncontrolled usage
  const inputValue = useMemo(() => (!isUndefined(propValue) ? propValue : localValue), [propValue, localValue]);

  // Track parent propValue controlled updates
  useEffect(() => {
    if (!propValue) {
      setModalValue(propInitialValue);
      return;
    }
    setModalValue(propValue);
  }, [propValue, propInitialValue]);

  // Lazily compute displayed label
  const labelValue = useMemo<string>(() => {
    if (isUndefined(inputValue)) {
      return '';
    }
    if (labelExtractor) {
      return labelExtractor(inputValue, {mode, locale});
    }
    return `${inputValue}`;
  }, [labelExtractor, inputValue, mode, locale]);

  // Propagate changed value
  const onConfirm = useCallback(
    (value?: Date) => {
      // @NOTE android uses direct calls while ios relies on a modalValue
      const nextValue = Platform.select({ios: modalValue, android: value});
      if (propOnChange) {
        propOnChange(utc ? asUTCDate(nextValue, {mode}) : nextValue);
      }
      if (onSubmitEditing) {
        // @NOTE Add a timeout to prevent swallowing siblings focus events
        setTimeout(() => {
          onSubmitEditing(nextValue);
        });
      }
      // Support uncontrolled usage
      if (isUndefined(propValue)) {
        setLocalValue(nextValue);
      }
    },
    [mode, utc, propValue, modalValue, propOnChange, onSubmitEditing]
  );

  // Reset modalValue to the proper value
  const onCancel = useCallback(() => {
    setModalValue(inputValue || propInitialValue);
  }, [inputValue, propInitialValue]);

  // Open the modal when user touches input
  const focus = Platform.select({
    android: useCallback(async () => {
      const prevValue = inputValue || propInitialValue;
      const {action, value: nextValue} = await openAndroidDatePicker(mode, {prevValue, androidMode});
      if (action !== DatePickerAndroid.dismissedAction) {
        onConfirm(nextValue);
      }
    }, [inputValue, propInitialValue, mode, androidMode, onConfirm]),
    ios: useCallback(() => {
      if (modalDialogRef.current) {
        modalDialogRef.current.show();
      }
    }, [])
  });

  // Expose API via an imperative handle
  useImperativeHandle(ref, () => ({focus}), [focus]);

  return (
    <>
      <InputButtonComponent onFocus={focus} value={labelValue} {...otherInputButtonProps} />
      {Platform.OS === 'ios' ? (
        <ModalDialog
          ref={modalDialogRef}
          title={title}
          onConfirm={onConfirm}
          onCancel={onCancel}
          confirmTitle={confirmTitle}
          cancelTitle={cancelTitle}>
          <DatePickerIOS
            mode={mode}
            date={modalValue}
            onDateChange={setModalValue}
            style={{flexGrow: 1}}
            locale={locale}
          />
        </ModalDialog>
      ) : null}
    </>
  );
};

export default forwardRef(DatePicker);
