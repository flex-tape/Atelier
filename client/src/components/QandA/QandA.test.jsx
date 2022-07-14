/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import QandA from './QandA.jsx';

describe('App component', () => {
  test('it renders', () => {
    render(<QandA />);
    // expect(screen.getByText('Q & A')).toBeInTheDocument();
 });
})