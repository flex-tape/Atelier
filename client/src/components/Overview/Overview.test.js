/** @jest-environment jsdom */
import React from 'react';
import { render } from '@testing-library/react';
import Overview from './Overview.jsx';

describe('Overview component', () => {
 test('it renders', () => {
   render(<Overview />);
 });
})