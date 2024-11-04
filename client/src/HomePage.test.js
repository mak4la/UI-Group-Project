import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HomePage from './HomePage';

test('renders welcome message', () => {
  act(() => {
    render(<HomePage />);
  });
  const headingElement = screen.getByText(/Welcome to PageNest!/i);
  expect(headingElement).toBeInTheDocument();
});
