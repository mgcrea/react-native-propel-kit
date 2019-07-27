import {TextStyle} from 'react-native';

export const TEXT_STYLE_PROPS: Array<keyof TextStyle> = ['color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight'];

const pickTextStyles = (style: TextStyle) =>
  TEXT_STYLE_PROPS.reduce<TextStyle>((soFar, prop) => {
    if (style && prop in style) {
      soFar[prop] = style[prop] as NonNullable<any>; // eslint-disable-line no-param-reassign
    }
    return soFar;
  }, {});

export default pickTextStyles;
