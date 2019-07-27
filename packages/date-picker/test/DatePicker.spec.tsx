import React from 'react';
import 'react-native';
// import renderer from 'react-test-renderer';
import {render, act, fireEvent} from 'react-native-testing-library';

import DatePicker from '../src';

describe('<DatePicker>', () => {
  it('renders correctly without props', () => {
    const component = render(<DatePicker />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  describe('should support a `value` prop', () => {
    it('and render it', () => {
      const props = {value: 'foo'};
      const {getByText} = render(<DatePicker {...props} />);
      expect(getByText(props.value)).toBeDefined();
    });
    it('and track parent updates', () => {
      const props = {value: 'foo'};
      const {getByText, update} = render(<DatePicker {...props} />);
      props.value = 'bar';
      update(<DatePicker {...props} />);
      expect(getByText(props.value)).toBeDefined();
    });
  });
  it('properly call onPress correctly', () => {
    const props = {value: 'foo', onPress: jest.fn()};
    const {getByText} = render(<DatePicker {...props} />);
    fireEvent.press(getByText(props.value));
    expect(props.onPress).toBeCalledTimes(1);
    expect(props.onPress).toBeCalledWith(undefined); // ?
  });
});
