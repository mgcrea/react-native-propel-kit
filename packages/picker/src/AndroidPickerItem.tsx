import React, {useMemo, useRef, useCallback, useEffect, Children, FunctionComponent, memo} from 'react';
import {Image, Picker, FlatList, TouchableHighlight, Platform, PickerProps} from 'react-native';
import styled from 'styled-components/native';

const ITEM_HEIGHT = 60;

const AndroidPickerItem: FunctionComponent<any> = React.memo(({item, onPress, selectedValue}) => (
  <TouchableHighlight
    delayPressIn={0}
    delayPressOut={0}
    onPress={() => onPress(item.value)}
    style={{zIndex: 99, flex: 1}}
  >
    <ItemContainer>
      <ItemTitle>{item.title}</ItemTitle>
      {item.value === selectedValue ? (
        <Image
          source={{
            uri:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAiUlEQVR4AWMYUDAKRgEjgyN1jFnO8I8hkxrG/AdDK+oY00CJMczUMmbdIDKGhVrGbBkAY/yBylkpNyaa4S9Q6S4Mo1hJ9VQSMNH/xzCKFcjHMIawUf9hRpFnDAJkohjFjmoMuUbxMuynLMILoNrfU2QMwii4MRSBCrgxFIM6mDGUA2ci1Y2CUQAAbvFlc3LWttMAAAAASUVORK5CYII='
          }}
          style={{width: 32, height: 32, marginHorizontal: 12}}
        />
      ) : null}
    </ItemContainer>
  </TouchableHighlight>
));

export default AndroidPickerItem;

const ItemContainer = styled.View`
  background: white;
  flex-direction: row;
  align-items: center;
  height: ${ITEM_HEIGHT}px;
`;

const ItemTitle = styled.Text`
  flex: 1 1 auto;
  padding: 0 16px;
  color: black;
  font-size: 20px;
  font-weight: 400;
`;
