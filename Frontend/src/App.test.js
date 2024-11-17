import { render, screen } from '@testing-library/react';
import App from './App';
import DjangoReact from './DjangoReact'; // Django React ouput

test('renders learn react link', () => {
  render(<App />); // Change to DjangReact if you want to see Djang React output
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
