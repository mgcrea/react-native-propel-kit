import React from 'react';
import 'react-native';
// import renderer from 'react-test-renderer';
import {render, act, fireEvent} from 'react-native-testing-library';

import Picker from '../src';

describe('<Picker>', () => {
  it('renders correctly', () => {
    const component = render(<Picker />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
