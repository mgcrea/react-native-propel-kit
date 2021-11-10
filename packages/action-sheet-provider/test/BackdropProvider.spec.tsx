import React from 'react';
import {render} from 'react-native-testing-library';

import {ActionSheetProvider} from './../src';

describe('<ActionSheetProvider>', () => {
  it('renders correctly', () => {
    const component = render(<ActionSheetProvider />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
