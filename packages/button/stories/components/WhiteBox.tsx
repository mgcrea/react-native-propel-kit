import React, {ReactNode, FunctionComponent} from 'react';
import {View} from 'react-native';

type Props = {
  children: ReactNode;
};

const WhiteBox: FunctionComponent<Props> = ({children}) => (
  <View
    style={{
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      flexDirection: 'row',
      margin: 12
    }}
  >
    {children}
  </View>
);

export default WhiteBox;
