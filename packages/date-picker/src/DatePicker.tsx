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
    [s: string]: unknown; // otherInputButtonProps
  };

export const defaultProps: Required<
  Pick<
    DatePickerProps,
    | 'androidDisplay'
    | 'initialValue'
    | 'InputButtonComponent'
    | 'labelExtractor'
    | 'locale'
    | 'mode'
    | 'display'
    | 'utc'
    | 'trim'
  >
> = {
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
      // InputButton props
      placeholder,
      // DatePicker props
      mode = defaultProps.mode,
      InputButtonComponent = defaultProps.InputButtonComponent,
      androidDisplay = defaultProps.androidDisplay,
      initialValue = defaultProps.initialValue,
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
    const value = propValue || initialValue;
    const [modalValue, setModalValue] = useState<Date>(value);

    // Track parent propValue controlled updates
    useEffect(() => {
      const nextValue = utc ? asLocaleDate(value) : value;
      setModalValue(nextValue);
    }, [value, utc]);

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
      // console.warn({nextValue});
      if (trim) {
        nextValue = trimDate(nextValue, mode);
        // console.warn({trim: nextValue});
      }
      if (utc) {
        nextValue = asUTCDate(nextValue);
        // console.warn({utc: nextValue});
      }
      return nextValue;
    };

    // Propagate changed value
    const onConfirm = useCallback(
      (value?: Date) => {
        // @NOTE android uses direct calls while ios relies on a modalValue
        const nextValue = computeDate(Platform.select({ios: modalValue, android: value}));
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
    const modalDialogRef = useRef<ModalDialogHandle>(null);
    const focus = Platform.select<InputButtonProps['onFocus']>({
      android: useCallback(async () => {
        const {action, value: nextValue} = await openAndroidDatePicker(mode, {
          value: inputValue,
          display: androidDisplay,
          utc
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
    });
    // Expose API via an imperative handle
    useImperativeHandle<DatePickerHandle, DatePickerHandle>(ref, () => ({focus}), [focus]);

    return (
      <>
        <InputButtonComponent onFocus={focus} placeholder={placeholder} value={labelValue} {...otherInputButtonProps} />
        {Platform.OS === 'ios' ? (
          <ModalDialog
            ref={modalDialogRef}
            title={title || placeholder}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmTitle={confirmTitle}
            cancelTitle={cancelTitle}
          >
            <View style={{height: mode === 'datetime' ? 417.5 : 368, width: '100%'}}>
              <DateTimePicker
                value={modalValue}
                mode={mode}
                style={{flex: 1}}
                display={display}
                onChange={(_event, date) => {
                  if (date) {
                    setModalValue(date);
                  }
                }}
              />
            </View>
          </ModalDialog>
        ) : null}
      </>
    );
  }
);

// 368
//417.5
