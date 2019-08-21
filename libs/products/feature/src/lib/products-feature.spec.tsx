import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ProductsFeature from './products-feature';

describe(' ProductsFeature', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<ProductsFeature />);
    expect(baseElement).toBeTruthy();
  });
});
