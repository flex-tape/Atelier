/** @jest-environment jsdom */

import React from 'react';
import { render } from '@testing-library/react';
import RatingsList from '../RatingsList.jsx';

describe('RatingsList component', () => {
  test('should render RatingsList component', () => {
    render(< RatingsList />)
  });
});