import React from 'react';
import { render } from '@testing-library/react';
import InputLabel from '..';

describe('InputLabel', () => {
  const label = 'test label';
  const requiredLabel = `${label} *`;

  test('should display correct label', () => {
    const inputLabel = render(<InputLabel label={label} />);

    const textLabel = inputLabel.getByText(new RegExp(label, 'i'));

    expect(textLabel).toBeDefined();
  });
  test('should display correct required label', () => {
    const inputLabel = render(<InputLabel label={label} required />);

    const textLabel = inputLabel.getByText(new RegExp(requiredLabel, 'i'));

    expect(textLabel).toBeDefined();
  });
});
