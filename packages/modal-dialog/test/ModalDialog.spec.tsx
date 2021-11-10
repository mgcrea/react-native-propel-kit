import React from 'react';
import {render} from 'react-native-testing-library';
import {ModalDialog} from './../src';

describe('<ModalDialog>', () => {
  it('renders correctly', () => {
    const component = render(<ModalDialog />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
