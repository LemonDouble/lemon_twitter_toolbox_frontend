import React from 'react';
import { render, screen } from '@testing-library/react';
import {ToggleColorModeApp} from './App';

test('renders learn react link', () => {
  render(<ToggleColorModeApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
