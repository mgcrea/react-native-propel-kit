import React from 'react';
import 'react-native';

import * as exportedInterface from '../src';

describe('propel-kit', () => {
  it('export a proper interface', () => {
    expect(exportedInterface).toMatchSnapshot();
  });
});
