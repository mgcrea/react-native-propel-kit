import React from 'react';
import 'react-native';
import {render} from 'react-native-testing-library';
import {Select} from '../src';

describe('<Select>', () => {
  it('renders correctly', () => {
    const component = render(<Select />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
