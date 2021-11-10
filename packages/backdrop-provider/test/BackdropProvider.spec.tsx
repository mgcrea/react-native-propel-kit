import React from 'react';
import {render} from 'react-native-testing-library';

import {BackdropProvider} from './../src';

describe('<BackdropProvider>', () => {
  it('renders correctly', () => {
    const component = render(<BackdropProvider />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
