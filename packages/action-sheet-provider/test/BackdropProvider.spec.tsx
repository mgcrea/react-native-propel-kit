// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {shallow} from 'enzyme';

import React from 'react';
import 'react-native';
import {create} from 'react-test-renderer';

import ActionSheetProvider from './..';

describe('<ActionSheetProvider>', () => {
  it('renders correctly', () => {
    const component = create(<ActionSheetProvider />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
