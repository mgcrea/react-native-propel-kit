import React, {useMemo, useRef, useCallback, useEffect, Children, FunctionComponent} from 'react';
import {FlatList, PickerProps, PickerItemProps, FlatListProperties} from 'react-native';
import AndroidPickerItem from './AndroidPickerItem';

type ItemT = {
  title?: string;
  key?: string;
  value: any;
};
export type Props = PickerProps & {
  itemHeight?: number;
  itemVisibleCount?: number;
};

export const defaultProps = {
  itemHeight: 50,
  itemVisibleCount: 5.5
};

// @NOTE uncontrolled usage is not functionnal
const AndroidPicker: FunctionComponent<Props> & {Item: typeof AndroidPickerItem} = ({
  children,
  onValueChange: propOnValueChange,
  selectedValue,
  itemHeight = defaultProps.itemHeight,
  itemVisibleCount = defaultProps.itemVisibleCount,
  style
}) => {
  const flatListRef = useRef<FlatList<any>>(null);
  const latestValue = useRef(selectedValue);
  const data = useMemo<ReadonlyArray<ItemT>>(
    () =>
      Children.map(children, child => {
        const {value, label} = (child as React.ReactElement).props;
        return {title: label, key: value, value};
      }).filter(Boolean),
    [children]
  );

  const getSelectedValueIndex = useCallback(
    value => {
      const selectedItem = data.find(item => item.value === value);
      return selectedItem ? data.indexOf(selectedItem) : -1;
    },
    [data]
  );
  const initialScrollIndex = useMemo(() => getSelectedValueIndex(selectedValue), [getSelectedValueIndex]); // eslint-disable-line react-hooks/exhaustive-deps
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
  }, [selectedValue, getSelectedValueIndex]);

  // Propagate changed value
  const onPress = useCallback(
    value => {
      latestValue.current = value;
      if (propOnValueChange) {
        const itemIndex = data.findIndex(item => item.value === value);
        propOnValueChange(value, itemIndex);
      }
    },
    [data, latestValue, propOnValueChange]
  );

  const keyExtractor = useCallback((item, _index: number) => item.value, []);
  const getItemLayout = useCallback(
    (item, index: number) => ({length: itemHeight, offset: itemHeight * index, index}),
    [itemHeight]
  );

  // @NOTE TouchableNativeFeedback is broken
  // console.warn({initialScrollIndex});
  return (
    <FlatList
      // debug={true}
      ref={flatListRef}
      data={data}
      extraData={selectedValue}
      keyExtractor={keyExtractor}
      initialScrollIndex={initialScrollIndex}
      getItemLayout={getItemLayout}
      style={[{maxHeight: itemHeight * itemVisibleCount}, style]}
      overScrollMode="always"
      renderItem={({item}) => <AndroidPickerItem {...{item, selectedValue, onPress}} />}
    />
  );
};

AndroidPicker.Item = AndroidPickerItem;

export default AndroidPicker;
