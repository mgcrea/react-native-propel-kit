import React, {FunctionComponent} from 'react';
import {Image, TouchableHighlight, View, Text, PickerItemProps, StyleProp, ViewStyle, TextStyle} from 'react-native';

export type Props = {
  item: PickerItemProps;
  itemHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const defaultProps = {
  itemHeight: 50
};

const AndroidPickerItem: FunctionComponent<any> = React.memo(
  ({item, itemHeight = defaultProps.itemHeight, containerStyle, titleStyle, onPress, selectedValue}) => (
    <TouchableHighlight
      delayPressIn={0}
      delayPressOut={0}
      onPress={() => onPress(item.value)}
      style={{zIndex: 99, flex: 1}}>
      <View style={[defaultStyles.container, containerStyle, {height: itemHeight}]}>
        <Text style={[defaultStyles.title, titleStyle]}>{item.title}</Text>
        {item.value === selectedValue ? (
          <Image
            source={{
              uri:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAiUlEQVR4AWMYUDAKRgEjgyN1jFnO8I8hkxrG/AdDK+oY00CJMczUMmbdIDKGhVrGbBkAY/yBylkpNyaa4S9Q6S4Mo1hJ9VQSMNH/xzCKFcjHMIawUf9hRpFnDAJkohjFjmoMuUbxMuynLMILoNrfU2QMwii4MRSBCrgxFIM6mDGUA2ci1Y2CUQAAbvFlc3LWttMAAAAASUVORK5CYII='
            }}
            style={{width: 32, height: 32, marginHorizontal: 12}}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  )
);

export default AndroidPickerItem;

export const defaultStyles: {[s: string]: ViewStyle | TextStyle} = {
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    paddingVertical: 0,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: '400'
  }
};
