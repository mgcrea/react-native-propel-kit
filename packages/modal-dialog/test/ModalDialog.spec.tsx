import React from 'react';
import 'react-native';
// import renderer from 'react-test-renderer';
import {render, act, fireEvent} from 'react-native-testing-library';

import ModalDialog from './../src/ModalDialog';

describe('<ModalDialog>', () => {
  it('renders correctly', () => {
    const component = render(<ModalDialog />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
