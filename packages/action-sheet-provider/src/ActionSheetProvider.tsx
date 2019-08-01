import React, {useCallback, useRef, FunctionComponent, useState, useEffect, useMemo, useContext} from 'react';
import {
  ActionSheetIOS,
  Platform,
  ModalProps,
  Keyboard,
  StyleProp,
  ViewStyle,
  ActionSheetIOSOptions
} from 'react-native';
import {BackdropContext, BackdropContextProps} from '@mgcrea/react-native-backdrop-provider';
import ActionSheet from './ActionSheet';
import {ModalDialogHandle} from '@mgcrea/react-native-modal-dialog';

type Props = ModalProps & {
  containerStyle?: StyleProp<ViewStyle>;
  native?: boolean;
};

const ActionSheetProvider: FunctionComponent<Props> = ({
  children,
  hardwareAccelerated,
  transparent = true,
  supportedOrientations = ['portrait', 'landscape'],
  native = true
}) => {
  const modalDialogRef = useRef<ModalDialogHandle>(null);
  const backdrop = useContext<BackdropContextProps>(BackdropContext);
  const [isVisible, setIsVisible] = useState(false);
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
  const contextValue = useMemo(() => {
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     showWithOptions(
  //       {
  //         title: 'Hello',
  //         message: `This component implements a custom ActionSheet and provides the same way to drawing it`,
  //         options: [
  //           'Cancel',
  //           'Remove',
  //           'Update',
  //           'Cancel',
  //           'Remove',
  //           'Update',
  //           'Cancel',
  //           'Remove',
  //           'Update',
  //           'Update',
  //           'Cancel',
  //           'Remove',
  //           'Update'
  //         ],
  //         destructiveButtonIndex: 1,
  //         cancelButtonIndex: 0
  //       },
  //       buttonIndex => {
  //         // console.warn('onButtonPress', {buttonIndex});
  //       }
  //     );
  //   }, 50);
  // }, []);

  return (
    <ActionSheetContext.Provider value={contextValue}>
      {children}
      {!native || Platform.OS !== 'ios' ? (
        <ActionSheet
          ref={modalDialogRef}
          // isVisible={isVisible}
          onButtonPress={onButtonPress}
          onCancel={onCancel}
          {...{hardwareAccelerated, supportedOrientations, transparent}}
          {...globalOptions}
        />
      ) : null}
    </ActionSheetContext.Provider>
  );
};

export default ActionSheetProvider;

export type ContextProps = null | {
  showWithOptions: (options: ActionSheetIOSOptions, callback: (buttonIndex: number) => void) => void;
  hide: () => void;
};

export const ActionSheetContext = React.createContext<ContextProps>(null);
