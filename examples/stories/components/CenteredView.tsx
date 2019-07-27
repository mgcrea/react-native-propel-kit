import React, {ReactNode, FunctionComponent} from 'react';
import {View} from 'react-native';

type Props = {
  children: ReactNode;
};

const CenteredView: FunctionComponent<Props> = ({children}) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 32
    }}
  >
    {children}
  </View>
);

export default CenteredView;
