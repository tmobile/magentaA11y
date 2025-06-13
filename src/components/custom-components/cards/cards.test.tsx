import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cards from './cards';

describe('Cards Component', () => {
  test('renders the Cards component with items', () => {
    const items = [
      { title: 'Card 1', description: 'Description 1', link: '/card-1' },
      { title: 'Card 2', description: 'Description 2', link: '/card-2' },
    ];

    render(
      <MemoryRouter>
        <Cards items={items} />
      </MemoryRouter>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(2);
  });

  test('renders card titles correctly', () => {
    const items = [
      {
        title: 'Accessibility Guide',
        description: 'Learn about accessibility',
        link: '/accessibility',
      },
      {
        title: 'Testing Best Practices',
        description: 'Best practices for testing',
        link: '/testing',
      },
    ];

    render(
      <MemoryRouter>
        <Cards items={items} />
      </MemoryRouter>
    );

    expect(screen.getByText('Accessibility Guide')).toBeInTheDocument();
    expect(screen.getByText('Testing Best Practices')).toBeInTheDocument();
  });

  test('renders card descriptions when provided', () => {
    const items = [
      {
        title: 'Accessibility Guide',
        description: 'Learn about accessibility',
        link: '/accessibility',
      },
      {
        title: 'Testing Best Practices',
        description: 'Best practices for testing',
        link: '/testing',
      },
    ];

    render(
      <MemoryRouter>
        <Cards items={items} />
      </MemoryRouter>
    );

    expect(screen.getByText('Learn about accessibility')).toBeInTheDocument();
    expect(screen.getByText('Best practices for testing')).toBeInTheDocument();
  });

  test('each card has a valid navigation link', () => {
    const items = [
      { title: 'Accessibility Guide', link: '/accessibility' },
      { title: 'Testing Best Practices', link: '/testing' },
    ];

    render(
      <MemoryRouter>
        <Cards items={items} />
      </MemoryRouter>
    );

    items.forEach((item) => {
      const linkElement = screen.getByRole('link', { name: item.title });
      expect(linkElement).toHaveAttribute('href', item.link);
    });
  });

  test('renders the description when provided', () => {
    const items = [
      {
        title: 'Accessibility Guide',
        description: 'Learn about accessibility best practices',
        link: '/accessibility',
      },
    ];

    render(
      <MemoryRouter>
        <Cards items={items} />
      </MemoryRouter>
    );

    const descriptionElement = screen.getByText(
      'Learn about accessibility best practices'
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  test('does not render the description when not provided', () => {
    const items = [
      {
        title: 'Accessibility Guide',
        link: '/accessibility',
      },
    ];

    render(
      <MemoryRouter>
        <Cards items={items} />
      </MemoryRouter>
    );

    const descriptionElements = screen.queryByText(
      /Learn about accessibility best practices/i
    );
    expect(descriptionElements).not.toBeInTheDocument();
  });
});
