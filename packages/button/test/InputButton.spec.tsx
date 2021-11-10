import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';

import {InputButton} from '../src';

describe('<InputButton>', () => {
  it('renders correctly without props', () => {
    const component = render(<InputButton />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  describe('should support a `value` prop', () => {
    it('and render it', () => {
      const props = {value: 'foo'};
      const {getByText} = render(<InputButton {...props} />);
      expect(getByText(props.value)).toBeDefined();
    });
    it('and track parent updates', () => {
      const props = {value: 'foo'};
      const {getByText, update} = render(<InputButton {...props} />);
      props.value = 'bar';
      update(<InputButton {...props} />);
      expect(getByText(props.value)).toBeDefined();
    });
  });
  it('properly call onPress correctly', () => {
    const props = {value: 'foo', onPress: jest.fn()};
    const {getByText} = render(<InputButton {...props} />);
    fireEvent.press(getByText(props.value));
    expect(props.onPress).toBeCalledTimes(1);
    expect(props.onPress).toBeCalledWith(undefined); // ?
  });
});
