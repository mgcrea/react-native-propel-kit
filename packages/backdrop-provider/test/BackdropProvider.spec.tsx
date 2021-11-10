import React from 'react';
import 'react-native';
import {act, create} from 'react-test-renderer';

import {BackdropProvider} from './../src';

describe('<BackdropProvider>', () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
  it('renders correctly', () => {
    const component = create(<BackdropProvider />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
