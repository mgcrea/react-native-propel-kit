import {Platform, NativeModules} from 'react-native';

export const getNavigatorLocale = () => {
  switch (Platform.OS) {
    case 'ios':
      return (
        NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
      );
    case 'android':
      return NativeModules.I18nManager.localeIdentifier;
    default:
      return 'en-US';
  }
};
