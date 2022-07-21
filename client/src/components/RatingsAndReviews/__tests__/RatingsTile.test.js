/** @jest-environment jsdom */

import React from 'react';
import { render } from '@testing-library/react';
import ReviewTile from '../ReviewTile.jsx';

describe('ReviewTile component', () => {
  test('should render ReviewTile component', () => {
    render(< ReviewTile />)
  });
});
