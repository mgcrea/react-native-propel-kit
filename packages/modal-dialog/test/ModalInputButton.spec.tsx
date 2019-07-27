import React from 'react';
import 'react-native';
import {render, fireEvent} from 'react-native-testing-library';

import ModalInputButton from './../src/ModalInputButton';

describe('<ModalInputButton>', () => {
  it('renders correctly', () => {
    const component = render(<ModalInputButton title="My Title" onPress={() => {}} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('onPress prop', () => {
    it('should properly call callback', () => {
      const onPressSpy = jest.fn();
      const {getByType, toJSON} = render(<ModalInputButton title="My Title" onPress={onPressSpy} />);
      expect(toJSON()).toMatchSnapshot();
      fireEvent.press(getByType(ModalInputButton));
      expect(onPressSpy).toHaveBeenCalledTimes(1);
    });
  });
});
