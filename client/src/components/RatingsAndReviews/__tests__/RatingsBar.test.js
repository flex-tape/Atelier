/** @jest-environment jsdom */

import React from 'react';
import { render } from '@testing-library/react';
import RatingsBar from '../RatingsBar.jsx';

describe('RatingsBar component', () => {
  test('should render RatingsBar component', () => {
    render(< RatingsBar />)
  });
});