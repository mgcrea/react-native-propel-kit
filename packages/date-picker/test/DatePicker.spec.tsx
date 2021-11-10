import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import {DatePicker} from '../src';

const DATE = new Date('2021-02-03T08:30:00.000Z');
const DATE_2 = new Date('2021-02-04T08:30:00.000Z');

describe('<DatePicker>', () => {
  it('renders correctly without props', () => {
    const component = render(<DatePicker />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  describe('should support a `value` prop', () => {
    it('and render it', () => {
      const props = {value: DATE};
      const {getByText} = render(<DatePicker {...props} />);
      expect(getByText(props.value.toLocaleDateString())).toBeDefined();
    });
    it('and track parent updates', () => {
      const props = {value: DATE};
      const {getByText, update} = render(<DatePicker {...props} />);
      props.value = DATE_2;
      update(<DatePicker {...props} />);
      expect(getByText(props.value.toLocaleDateString())).toBeDefined();
    });
  });
  it('properly call onPress correctly', () => {
    const props = {value: DATE, onPress: jest.fn()};
    const {getByText} = render(<DatePicker {...props} />);
    fireEvent.press(getByText(props.value.toLocaleDateString()));
    expect(props.onPress).toBeCalledTimes(1);
    expect(props.onPress).toBeCalledWith(undefined); // ?
  });
});
