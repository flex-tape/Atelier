/** @jest-environment jsdom */

import React from 'react';
import { render } from '@testing-library/react';
import RatingsAndReviews from '../RatingsAndReviews.jsx';

describe('RatingsAndReviews component', () => {
  test('should render RatingsAndReviews component', () => {
    render(< RatingsAndReviews />)
  });
});