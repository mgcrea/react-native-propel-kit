import {ModalDialogHandle} from '@mgcrea/react-native-modal-dialog';
import React, {FunctionComponent, useCallback, useMemo, useRef, useState} from 'react';
import {ActionSheetIOS, ActionSheetIOSOptions, Platform} from 'react-native';
import {ActionSheet, ActionSheetProps} from './ActionSheet';

export type ActionSheetContextValue = {
  showWithOptions: (options: ActionSheetIOSOptions, callback: (buttonIndex: number) => void) => void;
  hide: () => void;
};

// @ts-expect-error allow initial null
export const ActionSheetContext = React.createContext<ActionSheetContextValue>(null);

export type ActionSheetProviderProps = Omit<ActionSheetProps, 'options'> & {
  native?: boolean;
};

export const defaultProps: Partial<ActionSheetProviderProps> = {
  native: true
};

export const ActionSheetProvider: FunctionComponent<ActionSheetProviderProps> = ({
  children,
  native = defaultProps.native,
  ...otherActionSheetProps
}) => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  const [globalOptions, setGlobalOptions] = useState<ActionSheetIOSOptions>({options: []});
  const latestCallback = useRef<((buttonIndex: number) => void) | null>(null);

  // Show actionSheet
  const showWithOptions = useCallback(
    (options, callback) => {
      if (native && Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(options, callback);
        return;
      }
      setGlobalOptions(options);
      latestCallback.current = callback;
      if (modalDialogRef.current) {
        modalDialogRef.current.show();
      }
    },
    [native]
  );

  // Hide actionSheet
  const hide = useCallback(() => {
    if (native && Platform.OS === 'ios') {
      return;
    }
    if (modalDialogRef.current) {
      modalDialogRef.current.hide();
    }
  }, [native]);

  // Expose API via context
  const contextValue = useMemo<ActionSheetContextValue>(() => {
    return {showWithOptions, hide};
  }, [showWithOptions, hide]);

  const onButtonPress = useCallback(
    (buttonIndex: number) => {
      if (latestCallback.current) {
        latestCallback.current(buttonIndex);
      }
      hide();
    },
    [hide]
  );
  const onCancel = useCallback(() => {
    hide();
  }, [hide]);

  return (
    <ActionSheetContext.Provider value={contextValue}>
      {children}
      {!native || Platform.OS !== 'ios' ? (
        <ActionSheet
          ref={modalDialogRef}
          {...otherActionSheetProps}
          onButtonPress={onButtonPress}
          onCancel={onCancel}
          {...globalOptions}
        />
      ) : null}
    </ActionSheetContext.Provider>
  );
};
