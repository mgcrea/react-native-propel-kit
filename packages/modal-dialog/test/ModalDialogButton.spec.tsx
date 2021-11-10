import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import {ModalDialogButton} from './../src';

describe('<ModalDialogButton>', () => {
  it('renders correctly', () => {
    const props = {title: 'My Title', onPress: jest.fn()};
    const component = render(<ModalDialogButton {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('onPress prop', () => {
    it('should properly call callback', () => {
      const props = {title: 'My Title', onPress: jest.fn()};
      const {UNSAFE_getByType, toJSON} = render(<ModalDialogButton {...props} />);
      expect(toJSON()).toMatchSnapshot();
      fireEvent.press(UNSAFE_getByType(ModalDialogButton));
      expect(props.onPress).toHaveBeenCalledTimes(1);
    });
  });
});
