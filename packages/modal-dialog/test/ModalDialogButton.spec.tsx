import React from 'react';
import 'react-native';
import {render, fireEvent} from 'react-native-testing-library';

import {ModalDialogButton} from './../src';

describe('<ModalDialogButton>', () => {
  it('renders correctly', () => {
    const component = render(<ModalDialogButton title="My Title" onPress={() => {}} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('onPress prop', () => {
    it('should properly call callback', () => {
      const onPressSpy = jest.fn();
      const {getByType, toJSON} = render(<ModalDialogButton title="My Title" onPress={onPressSpy} />);
      expect(toJSON()).toMatchSnapshot();
      fireEvent.press(getByType(ModalDialogButton));
      expect(onPressSpy).toHaveBeenCalledTimes(1);
    });
  });
});
