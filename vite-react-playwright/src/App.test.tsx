import React from 'react';
import App from './App';
import { cleanup, render, fireEvent } from '@testing-library/react';

afterEach(cleanup);

it('react text', () => {
  const { container } = render(<App />);

  fireEvent.click(container.querySelector('button')!);
  expect(container.querySelector('button')!.textContent).toBe('count is 1');
});
