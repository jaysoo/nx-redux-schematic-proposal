import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Button from './button';

describe(' Button', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<Button />);
    expect(baseElement).toBeTruthy();
  });
});
