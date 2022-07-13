import { loading, visual } from '@testing-library/react';
import App from './App';

test('loads learn react link', () => {
  load(<App />);
  const linkElement = visual.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
