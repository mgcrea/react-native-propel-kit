import React, {FunctionComponent} from 'react';
import {PickerItemProps, StyleProp, Text, TextStyle, TouchableHighlight, View, ViewStyle} from 'react-native';

export type Props = {
  item: PickerItemProps & {title?: string};
  onPress: (v: PickerItemProps['value']) => void;
  selectedValue?: PickerItemProps['value'];
  itemHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const defaultProps = {
  itemHeight: 50
};

const AndroidPickerItem: FunctionComponent<Props> = React.memo(
  ({item, itemHeight = defaultProps.itemHeight, containerStyle, titleStyle, onPress, selectedValue}) => {
    const isSelected = item.value === selectedValue && typeof selectedValue !== 'undefined';
    return (
      <TouchableHighlight
        delayPressIn={0}
        delayPressOut={0}
        onPress={() => onPress(item.value)}
        style={{zIndex: 99, flex: 1}}>
        <View style={[defaultStyles.container, containerStyle, {height: itemHeight}]}>
          <Text style={[defaultStyles.title, isSelected ? defaultStyles.selectedTitle : null, titleStyle]}>
            {item.label || item.title}
          </Text>
          {/* {isSelected ? (
            <Image
              source={{
                uri:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAiUlEQVR4AWMYUDAKRgEjgyN1jFnO8I8hkxrG/AdDK+oY00CJMczUMmbdIDKGhVrGbBkAY/yBylkpNyaa4S9Q6S4Mo1hJ9VQSMNH/xzCKFcjHMIawUf9hRpFnDAJkohjFjmoMuUbxMuynLMILoNrfU2QMwii4MRSBCrgxFIM6mDGUA2ci1Y2CUQAAbvFlc3LWttMAAAAASUVORK5CYII='
              }}
              style={{width: 32, height: 32, marginHorizontal: 12}}
            />
          ) : null} */}
        </View>
      </TouchableHighlight>
    );
  }
);

AndroidPickerItem.displayName = 'AndroidPickerItem';

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
  },
  selectedTitle: {
    color: '#009688', // android.teal500 (@see https://material.io/design/color/the-color-system.html)
    fontWeight: 'bold'
  }
};
