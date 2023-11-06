import { render, screen } from '@testing-library/react';
import HeroBanner from '../components/Banner';

test('renders the DHIS2 Dashboard title', () => {
  render(<HeroBanner />);
  const titleElement = screen.getByText('DHIS2 Dashboard');
  expect(titleElement).toBeInTheDocument();
});

test('renders the description text', () => {
  render(<HeroBanner />);
  const descriptionElement = screen.getByText('Test Done by Chisom Chima chimachisom360@gmail.com');
  expect(descriptionElement).toBeInTheDocument();
});

test('renders a link to Github', () => {
  render(<HeroBanner />);
  const githubLink = screen.getByText('Visit Github');
  expect(githubLink).toBeInTheDocument();
  expect(githubLink).toHaveAttribute('href', 'https://github.com/Chisomchima/dhis2-project');
});

test('renders the logo for medium screens and larger', () => {
  render(<HeroBanner />);
  const logoElement = screen.getByTestId('logo');
  expect(logoElement).toBeInTheDocument();
  expect(logoElement).toHaveClass('hidden md:block');
});
