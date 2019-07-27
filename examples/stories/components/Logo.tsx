import React, {FunctionComponent} from 'react';
import {View, Image} from 'react-native';
import logoImage from './logo_white.png';

type Props = {};

const RATIO = 8;

const Logo: FunctionComponent<Props> = () => (
  <View style={{marginTop: 24, padding: 24, alignItems: 'flex-start'}}>
    <Image source={logoImage} style={{width: 1200 / RATIO, height: 800 / RATIO}} />
  </View>
);

export default Logo;
