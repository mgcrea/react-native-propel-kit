import {ReactNode, ElementType} from 'react';
import {InputButton} from '@mgcrea/react-native-button';
import {TextInputProps} from 'react-native';

type Defaults = {
  InputButtonComponent: ElementType<TextInputProps>;
};

const defaults: Defaults = {
  InputButtonComponent: InputButton
};

export default defaults;
