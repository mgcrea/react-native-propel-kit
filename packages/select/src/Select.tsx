// @source https://github.com/lawnstarter/react-native-picker-select/blob/master/src/index.js

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
  useEffect,
  Children,
  ElementType
} from 'react';
import {StyleProp, TextStyle, TextInputProps} from 'react-native';

import Picker, {PickerItem} from '@mgcrea/react-native-picker';
import ModalDialog, {ModalDialogHandle} from '@mgcrea/react-native-modal-dialog';
import defaults from './defaults';

const isUndefined = (maybeUndefined: any): maybeUndefined is undefined => typeof maybeUndefined === 'undefined';

type SelectValue = string | number | undefined;

export type Props = {
  cancelTitle?: string;
  children?: ReactNode;
  confirmTitle?: string;
  initialValue?: SelectValue;
  InputButtonComponent?: ElementType<TextInputProps>;
  onValueChange?: (value: SelectValue) => void;
  onEndEditing?: () => void;
  onSubmitEditing?: (value: SelectValue) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  value?: SelectValue;
};

export type Handle = {
  focus: () => void;
};

const Select: RefForwardingComponent<Handle, Props> = (
  {
    cancelTitle,
    children,
    confirmTitle,
    InputButtonComponent = defaults.InputButtonComponent,
    initialValue: propInitialValue = '',
    onValueChange: propOnValueChange,
    onEndEditing,
    onSubmitEditing,
    placeholder,
    value: propValue,
    ...otherProps
  },
  ref
) => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  const [localValue, setLocalValue] = useState<SelectValue>();
  const [modalValue, setModalValue] = useState<SelectValue>(propValue || propInitialValue);
  // @NOTE always track latest value to properly detect outside propValue changes
  // const latestValue = useRef(propValue || propInitialValue);
  // const setModalValue = useCallback(value => {
  //   latestValue.current = value;
  //   _setModalValue(value);
  // }, []);

  // Track actual checked value
  const inputValue = !isUndefined(propValue) ? propValue : localValue;

  // Catch-up for parent propValue changes
  useEffect(() => {
    // if (propValue !== latestValue.current) {
    setModalValue(propValue || propInitialValue);
    // }
  }, [propValue, propInitialValue, setModalValue]);

  // Open the modal when user touches input
  const focus = useCallback(() => {
    if (modalDialogRef.current) {
      modalDialogRef.current.show();
    }
  }, []);

  // Expose API via an imperative handle
  useImperativeHandle(ref, () => ({focus}), [focus]);

  // Propagate changed value
  const onConfirm = useCallback(() => {
    if (propOnValueChange) {
      propOnValueChange(modalValue);
    }
    if (onEndEditing) {
      onEndEditing();
    }
    if (onSubmitEditing) {
      // @NOTE Add a timeout to prevent swallowing siblings focus events
      setTimeout(() => {
        onSubmitEditing(modalValue);
      });
    }
    // Support uncontrolled usage
    setLocalValue(modalValue);
  }, [modalValue, onSubmitEditing, onEndEditing, propOnValueChange]);

  // Reset modalValue to the proper value
  const onCancel = useCallback(() => {
    setModalValue(inputValue || propInitialValue);
  }, [inputValue, propInitialValue]);

  // Track modal value updates
  const onValueChange = useCallback(value => {
    setModalValue(value);
  }, []);

  // Lazily compute displayed label
  const labelValue = useMemo(() => {
    if (isUndefined(inputValue)) {
      return '';
    }
    const childrenAsArray: ReactElement[] = React.Children.toArray(children) as ReactElement[];
    const selectedChild = childrenAsArray.find(child => child.props.value === inputValue);
    const label = selectedChild ? selectedChild.props.label || selectedChild.props.value : '';
    return label;
  }, [children, inputValue]);

  // @NOTE Hack around lousy handling of picker children (@see https://github.com/facebook/react-native/pull/8153)
  const pickerChildren = useMemo<ReactNode | ReactNode[]>(
    () =>
      propInitialValue
        ? children
        : [<PickerItem key="undefined" label="" value={undefined} />].concat(
            Children.toArray<ReactElement>(children as ReactElement)
          ),
    [propInitialValue, children]
  );

  return (
    <>
      <InputButtonComponent onFocus={focus} placeholder={placeholder} value={labelValue} {...otherProps} />
      <ModalDialog
        ref={modalDialogRef}
        title={placeholder}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmTitle={confirmTitle}
        cancelTitle={cancelTitle}
      >
        <Picker onValueChange={onValueChange} selectedValue={modalValue} style={{flexGrow: 1}}>
          {pickerChildren}
        </Picker>
      </ModalDialog>
    </>
  );
};

export default forwardRef(Select);

export const Item = PickerItem; // eslint-disable-line prefer-destructuring
