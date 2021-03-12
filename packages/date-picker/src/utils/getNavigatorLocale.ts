import {Platform, NativeModules} from 'react-native';

export const getNavigatorLocale = () => {
  return Platform.select<string>({
    ios: NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0],
    android: NativeModules.I18nManager.localeIdentifier,
    default: 'en-US'
  });
};
