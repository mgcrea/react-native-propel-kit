import {InputButton, InputButtonProps} from '@mgcrea/react-native-button';
import ModalDialog, {ModalDialogHandle, ModalDialogProps} from '@mgcrea/react-native-modal-dialog';
import {Picker} from '@react-native-picker/picker';
import React, {
  Children,
  ElementType,
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {StyleProp, TextStyle} from 'react-native';

const isUndefined = (maybeUndefined: any): maybeUndefined is undefined => typeof maybeUndefined === 'undefined';

export const SelectItem = Picker.Item;

export type SelectValue = string | number | undefined;

export type SelectHandle = {
  focus: () => void;
};

export type SelectProps = Pick<ModalDialogProps, 'title' | 'confirmTitle' | 'cancelTitle'> & {
  children?: ReactNode;
  initialValue?: SelectValue;
  InputButtonComponent?: ElementType<InputButtonProps>;
  onChange?: (value: SelectValue) => void;
  onEndEditing?: () => void;
  onSubmitEditing?: (value: SelectValue) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  value?: SelectValue;
  [s: string]: unknown; // unknown otherProps for InputButtonComponent
};

export const defaultProps = {
  InputButtonComponent: InputButton
};

export const Select = Object.assign(
  forwardRef<SelectHandle, SelectProps>(
    (
      {
        children,
        // ModalDialog props
        cancelTitle,
        confirmTitle,
        title,
        // Select props
        initialValue: propInitialValue,
        InputButtonComponent = defaultProps.InputButtonComponent,
        onChange: propOnChange,
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

      // Support both controlled/uncontrolled usage
      const inputValue = useMemo(() => (!isUndefined(propValue) ? propValue : localValue), [propValue, localValue]);

      // Track parent propValue controlled updates
      useEffect(() => {
        setModalValue(propValue || propInitialValue);
      }, [propValue, propInitialValue]);

      // Lazily compute displayed label
      const labelValue = useMemo(() => {
        if (isUndefined(inputValue)) {
          return '';
        }
        const childrenAsArray: ReactElement[] = React.Children.toArray(children) as ReactElement[];
        const selectedChild = childrenAsArray.find((child) => child.props.value === inputValue);
        const label = selectedChild ? selectedChild.props.label || selectedChild.props.value : '';
        return label;
      }, [children, inputValue]);

      // Propagate changed value
      const onConfirm = useCallback(() => {
        if (propOnChange) {
          propOnChange(modalValue);
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
      }, [modalValue, onSubmitEditing, onEndEditing, propOnChange]);

      // Reset modalValue to the proper value
      const onCancel = useCallback(() => {
        setModalValue(inputValue || propInitialValue);
      }, [inputValue, propInitialValue]);

      // Open the modal when user touches input
      const focus = useCallback(() => {
        if (modalDialogRef.current) {
          modalDialogRef.current.show();
        }
      }, []);

      // Expose API via an imperative handle
      useImperativeHandle(ref, () => ({focus}), [focus]);

      // @NOTE Hack around lousy handling of picker children (@see https://github.com/facebook/react-native/pull/8153)
      const pickerChildren = useMemo<ReactNode | ReactNode[]>(
        () =>
          propInitialValue
            ? children
            : ([<Picker.Item key="undefined" label="" value={undefined} />] as ReactNode[]).concat(
                Children.toArray(children)
              ),
        [propInitialValue, children]
      );

      // Track modal value updates
      const onValueChange = useCallback((value) => {
        setModalValue(value);
      }, []);

      return (
        <>
          <InputButtonComponent onFocus={focus} placeholder={placeholder} value={labelValue} {...otherProps} />
          <ModalDialog
            ref={modalDialogRef}
            title={title || placeholder}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmTitle={confirmTitle}
            cancelTitle={cancelTitle}>
            <Picker style={{flexGrow: 1}} onValueChange={onValueChange} selectedValue={modalValue}>
              {pickerChildren}
            </Picker>
          </ModalDialog>
        </>
      );
    }
  ),
  {Item: SelectItem}
);
