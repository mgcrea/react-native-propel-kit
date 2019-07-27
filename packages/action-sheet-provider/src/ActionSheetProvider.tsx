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

type Props = ModalProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

const ActionSheetProvider: FunctionComponent<Props> = ({
  children,
  hardwareAccelerated,
  transparent = true,
  supportedOrientations = ['portrait', 'landscape']
}) => {
  const backdrop = useContext<BackdropContextProps>(BackdropContext);
  const [isVisible, setIsVisible] = useState(false);
  const [globalOptions, setGlobalOptions] = useState<ActionSheetIOSOptions>({options: []});
  const latestCallback = useRef<((buttonIndex: number) => void) | null>(null);

  // Show actionSheet
  const showWithOptions = useCallback((options, callback) => {
    if (Platform.OS === 'ios') {
      return ActionSheetIOS.showActionSheetWithOptions(options, callback);
    }
    setGlobalOptions(options);
    latestCallback.current = callback;
    setIsVisible(true);
  }, []);

  // Hide actionSheet
  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Animate backdrop along "isVisible" prop
  useEffect(() => {
    if (backdrop) {
      isVisible ? backdrop.show() : backdrop.hide();
    }
  }, [backdrop, isVisible]);

  // Toggle keyboard along "isVisible" prop
  useEffect(() => {
    // Force blur on other inputs
    if (isVisible) {
      Keyboard.dismiss();
    }
  }, [isVisible]);

  // Always hide on unmount
  useEffect(() => {
    return () => {
      hide();
    };
  }, [hide]);

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

  return (
    <ActionSheetContext.Provider value={contextValue}>
      {children}
      {Platform.OS === 'android' ? (
        <ActionSheet
          isVisible={isVisible}
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
