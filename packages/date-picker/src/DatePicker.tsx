import {InputButton, InputButtonProps} from '@mgcrea/react-native-button';
import ModalDialog, {ModalDialogHandle, ModalDialogProps} from '@mgcrea/react-native-modal-dialog';
import DateTimePicker, {AndroidNativeProps, IOSNativeProps} from '@react-native-community/datetimepicker';
import React, {
  ElementType,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {Platform, View} from 'react-native';
import {
  asLocaleDate,
  asStartOfDate,
  asUTCDate,
  DatePickerAndroid,
  defaultLabelExtractor,
  getNavigatorLocale,
  isUndefined,
  LabelExtractorOptions,
  openAndroidDatePicker,
  trimDate
} from './utils';

// const CURRENT_YEAR = new Date().getFullYear();
// const FIRST_DAY_OF_YEAR = new Date(Date.UTC(CURRENT_YEAR, 0, 1));
const START_OF_TODAY = asStartOfDate(new Date(), 'day');

export type DatePickerHandle = {
  focus: InputButtonProps['onFocus'];
};

export type DatePickerProps = Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> &
  Pick<IOSNativeProps, 'mode' | 'display' | 'locale'> & {
    androidDisplay?: AndroidNativeProps['display'];
    initialValue?: Date;
    InputButtonComponent?: ElementType<InputButtonProps>;
    labelExtractor?: (value: Date, options: LabelExtractorOptions) => string;
    onChange?: (value: Date) => void;
    placeholder?: string;
    onSubmitEditing?: (value: Date) => void; // Callback that is called when the text input's submit button is pressed.
    value?: Date;
    utc?: boolean;
    trim?: boolean;
  };

export const defaultProps: Partial<DatePickerProps> = {
  androidDisplay: 'default',
  initialValue: START_OF_TODAY,
  InputButtonComponent: InputButton,
  labelExtractor: defaultLabelExtractor,
  locale: getNavigatorLocale(),
  mode: 'date',
  display: 'inline',
  utc: false,
  trim: false
};

export const DatePicker = forwardRef<DatePickerHandle, DatePickerProps>(
  (
    {
      // ModalDialog props
      cancelTitle,
      confirmTitle,
      title,
      mode = defaultProps.mode!,
      placeholder,
      androidDisplay = defaultProps.androidDisplay,
      initialValue = defaultProps.initialValue!,
      labelExtractor = defaultProps.labelExtractor,
      locale = defaultProps.locale,
      onChange: propOnChange,
      value: propValue,
      utc = defaultProps.utc,
      trim = defaultProps.trim,
      display = defaultProps.display,
      onSubmitEditing,
      ...otherInputButtonProps
    },
    ref
  ) => {
    const modalDialogRef = useRef<ModalDialogHandle>(null);
    const value = propValue || initialValue;
    const [modalValue, setModalValue] = useState<Date>(value);

    // Track propValue for changes
    useEffect(() => {
      setModalValue(utc ? asLocaleDate(value) : value);
    }, [propValue, utc]);

    // Support both controlled/uncontrolled usage
    const [localValue, setLocalValue] = useState<Date>(initialValue);
    const inputValue = !isUndefined(propValue) ? propValue : localValue;

    // Lazily compute displayed label
    const labelValue = useMemo<string>(() => {
      if (isUndefined(inputValue)) {
        return '';
      }
      if (labelExtractor) {
        return labelExtractor(inputValue, {mode, locale, utc});
      }
      return `${inputValue}`;
    }, [labelExtractor, inputValue, mode, locale, utc]);

    const computeDate = (date: Date = initialValue) => {
      let nextValue = date;
      if (trim) {
        nextValue = trimDate(nextValue, mode);
      }
      if (utc) {
        nextValue = asUTCDate(nextValue);
      }
      return nextValue;
    };

    // Propagate changed value
    const onConfirm = useCallback(
      (value?: Date) => {
        // @NOTE android uses direct calls while ios relies on a modalValue
        const nextValue = computeDate(Platform.select({ios: modalValue, android: value})!);
        if (propOnChange) {
          propOnChange(nextValue);
        }
        if (onSubmitEditing) {
          // @NOTE prevent swallowing siblings focus events
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
      setModalValue(inputValue || initialValue);
    }, [inputValue]);

    // Open the modal when user touches input
    const focus = Platform.select<InputButtonProps['onFocus']>({
      android: useCallback(async () => {
        const {action, value: nextValue} = await openAndroidDatePicker(mode, {
          value: inputValue,
          display: androidDisplay
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          onConfirm(computeDate(nextValue));
        }
      }, [inputValue, mode, onConfirm]),
      default: useCallback(() => {
        if (modalDialogRef.current) {
          modalDialogRef.current.show();
        }
      }, [])
    })!;

    // Expose API via an imperative handle
    useImperativeHandle<DatePickerHandle, DatePickerHandle>(ref, () => ({focus}), [focus]);

    return (
      <>
        <InputButton onFocus={focus} placeholder={placeholder} value={labelValue} />
        {Platform.OS === 'ios' ? (
          <ModalDialog
            ref={modalDialogRef}
            title={title || placeholder}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmTitle={confirmTitle}
            cancelTitle={cancelTitle}>
            <View style={{height: 300, width: '100%'}}>
              <DateTimePicker
                value={modalValue}
                mode={mode}
                style={{flex: 1}}
                display={display}
                onChange={(_event, date) => {
                  setModalValue(date!);
                }}
              />
            </View>
          </ModalDialog>
        ) : null}
      </>
    );
  }
);
