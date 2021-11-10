import React from 'react';
import 'react-native';
// import renderer from 'react-test-renderer';
import {render, act, fireEvent} from 'react-native-testing-library';

import {Select} from '../src';

describe('<Select>', () => {
  it('renders correctly', () => {
    const component = render(<Select />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
