import React from 'react';

import * as exportedInterface from '../src';

describe('propel-kit', () => {
  it('export a proper interface', () => {
    expect(exportedInterface).toMatchSnapshot();
  });
});
