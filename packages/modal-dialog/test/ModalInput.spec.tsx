import React from 'react';
import 'react-native';
// import renderer from 'react-test-renderer';
import {render, act, fireEvent} from 'react-native-testing-library';

import ModalInput from './../src/ModalInput';

describe('<ModalInput>', () => {
  it('renders correctly', () => {
    const component = render(<ModalInput />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
