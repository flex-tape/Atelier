/** @jest-environment jsdom */

import React from 'react';
import { render } from '@testing-library/react';
import RatingsBox from '../RatingsBox.jsx';

describe('RatingsBox component', () => {
  test('should render RatingsBox component', () => {
    render(< RatingsBox />)
  });
});