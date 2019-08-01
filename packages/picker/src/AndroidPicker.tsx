import React, {useMemo, useRef, useCallback, useEffect, Children, FunctionComponent} from 'react';
import {FlatList, PickerProps} from 'react-native';
import AndroidPickerItem from './AndroidPickerItem';

const ITEM_HEIGHT = 60;

export type Props = PickerProps;

// @NOTE uncontrolled usage is not functionnal
const AndroidPicker: FunctionComponent<Props> = ({children, onValueChange: propOnValueChange, selectedValue}) => {
  const flatListRef = useRef<FlatList<any>>(null);
  const latestValue = selectedValue;
  const data = useMemo(
    () =>
      Children.map(children, child => {
        const {value, label} = child.props;
        return {title: label, key: value, value};
      }),
    [children]
  );

  const getSelectedValueIndex = useCallback(
    value => {
      const selectedItem = data.find(item => item.value === value);
      return selectedItem ? data.indexOf(selectedItem) : -1;
    },
    [data]
  );
  const initialScrollIndex = useMemo(() => getSelectedValueIndex(selectedValue), [getSelectedValueIndex]);
  // Track parent selectedValue updates
  useEffect(() => {
    if (selectedValue !== latestValue.current) {
      // Update internal ref
      latestValue.current = selectedValue;
      // Scroll to proper index
      const selectedValueIndex = getSelectedValueIndex(selectedValue);
      if (selectedValueIndex !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({animated: true, index: selectedValueIndex});
      }
    }
  }, [selectedValue]);

  // Propagate changed value
  const onPress = useCallback(
    value => {
      latestValue.current = value;
      if (propOnValueChange) {
        propOnValueChange(value);
      }
    },
    [propOnValueChange]
  );

  const keyExtractor = useCallback((item, _index: number) => item.value, []);
  const getItemLayout = useCallback(
    (item, index: number) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}),
    []
  );

  // @NOTE TouchableNativeFeedback is broken
  return (
    <FlatList
      // debug={true}
      ref={flatListRef}
      data={data}
      extraData={selectedValue}
      keyExtractor={keyExtractor}
      initialScrollIndex={initialScrollIndex}
      getItemLayout={getItemLayout}
      // style={{maxHeight: ITEM_HEIGHT * 5.5}}
      // initialNumToRender={1000}
      overScrollMode="always"
      renderItem={({item}) => <AndroidPickerItem {...{item, selectedValue, onPress}} />}
    />
  );
};

export default AndroidPicker;
