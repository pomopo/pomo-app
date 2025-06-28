// src/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from './Login';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
