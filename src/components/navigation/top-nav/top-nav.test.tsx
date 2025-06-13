import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ViewportProvider } from 'shared/contexts/viewport-context';
import { DocumentationCategory } from 'shared/types/shared-types';
import { TopNavProps } from '../nav.types';
import TopNav, { getFirstOverviewLink } from './top-nav';

const renderWithProviders = (
  ui: React.ReactElement,
  { initialEntries = ['/home'] } = {}
) => {
  return render(
    <ViewportProvider>
      <MemoryRouter
        initialEntries={initialEntries}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        {ui}
      </MemoryRouter>
    </ViewportProvider>
  );
};

const mockNavItems: TopNavProps['navItems'] = [
  { label: 'Web Criteria', href: '/web-criteria' },
  { label: 'Native App Criteria', href: '/native-criteria' },
  { label: 'About Us', href: '/about' },
];

describe('TopNav Component - Snapshot Test', () => {
  test('matches the snapshot', () => {
    const { asFragment } = renderWithProviders(
      <TopNav navItems={mockNavItems} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('TopNav Component - Basic Rendering', () => {
  test('renders the TopNav component', () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('contains the correct class name', () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('MagentaA11y__navbar__nav');
  });

  test('navigation list exists', () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);
    const navList = screen.getByRole('list');
    expect(navList).toBeInTheDocument();
  });
});

describe('TopNav Component - Content & Accessibility Tests', () => {
  test('each NavLink has the correct label', () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);

    mockNavItems.forEach((item) => {
      const matchingLinks = screen.getAllByRole('link', {
        name: item.ariaLabel,
      });
      expect(matchingLinks.length).toBeGreaterThan(0);
    });
  });

  test('nav items render with correct labels', () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);

    mockNavItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  test('menu button has correct accessible labels', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 936px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderWithProviders(<TopNav navItems={mockNavItems} />);

    const menuButton = screen.getByRole('button');
    expect(menuButton).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/menu|close/i)
    );
  });

  test('navigation section has the correct ARIA label', () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'main');
  });
});

describe('TopNav Component - Interaction Tests', () => {
  beforeEach(() => {
    // Mock matchMedia for mobile behavior
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 936px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  test('clicking the menu button toggles expanded state (Mobile Only)', async () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);
    const menuButton = screen.getByRole('button');

    // Ensure menu starts closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open menu
    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Click to close menu
    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('clicking a navigation item closes the menu (Mobile Only)', async () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);
    const menuButton = screen.getByRole('button');

    // Open the menu
    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Click on a nav link
    const navLink = screen.getByRole('link', { name: /web criteria/i });
    await userEvent.click(navLink);

    // Menu should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('clicking outside the nav closes the menu (Mobile Only)', async () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);
    const menuButton = screen.getByRole('button');

    // Open the menu
    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Simulate clicking outside the menu
    fireEvent.mouseDown(document.body);

    // Menu should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('handles keyboard navigation correctly (Mobile Only)', async () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);
    const menuButton = screen.getByRole('button');

    // Open the menu
    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Get focusable elements inside the menu
    const focusableElements = screen.getAllByRole('link');
    expect(focusableElements.length).toBeGreaterThan(0);

    let currentIndex = 1; // setting to 1 to skip the home link

    // Focus the first element and simulate Tab key press
    await userEvent.tab();
    expect(focusableElements[currentIndex]).toHaveFocus();

    // Press Tab to move forward
    currentIndex++;
    await userEvent.tab();
    expect(focusableElements[currentIndex]).toHaveFocus();

    // Shift + Tab should move backward
    currentIndex--;
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    expect(focusableElements[currentIndex]).toHaveFocus();

    // Simulate pressing Tab on last element
    for (let i = currentIndex; i < focusableElements.length; i++) {
      await userEvent.tab();
    }

    // Pressing Tab again should close the menu
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('TopNav Component - Navigation Behavior Tests', () => {
  test('each NavLink has the correct href attribute', () => {
    renderWithProviders(<TopNav navItems={mockNavItems} />);

    expect(screen.getByRole('link', { name: 'Web Criteria' })).toHaveAttribute(
      'href',
      getFirstOverviewLink(DocumentationCategory.WEB)
    );

    expect(
      screen.getByRole('link', { name: 'Native App Criteria' })
    ).toHaveAttribute(
      'href',
      getFirstOverviewLink(DocumentationCategory.NATIVE)
    );

    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  test('clicking a NavLink updates the URL', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <TopNav navItems={mockNavItems} />
        <Routes>
          <Route
            path="/web-criteria/*"
            element={<div data-testid="web-page">Web Criteria Page</div>}
          />
          <Route
            path="/native-criteria/*"
            element={<div data-testid="native-page">Native Criteria Page</div>}
          />
          <Route
            path="/about"
            element={<div data-testid="about-page">About Page</div>}
          />
        </Routes>
      </>,
      { initialEntries: ['/'] }
    );

    await user.click(screen.getByRole('link', { name: 'Web Criteria' }));
    expect(await screen.findByTestId('web-page')).toBeInTheDocument();

    await screen.findByRole('link', { name: 'Native App Criteria' });

    await user.click(screen.getByRole('link', { name: 'Native App Criteria' }));
    expect(await screen.findByTestId('native-page')).toBeInTheDocument();

    await screen.findByRole('link', { name: 'About Us' });
    await user.click(screen.getByRole('link', { name: 'About Us' }));
    expect(await screen.findByTestId('about-page')).toBeInTheDocument();
  });

  test('active class is applied to the correct link', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <Routes>
        <Route path="*" element={<TopNav navItems={mockNavItems} />} />
      </Routes>,
      { initialEntries: ['/web-criteria'] }
    );

    expect(screen.getByRole('link', { name: 'Web Criteria' })).toHaveClass(
      'active'
    );

    await user.click(screen.getByRole('link', { name: 'Native App Criteria' }));
    expect(screen.getByRole('link', { name: 'Native App Criteria' })).toHaveClass(
      'active'
    );

    await user.click(screen.getByRole('link', { name: 'About Us' }));
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveClass(
      'active'
    );
  });
});

test('menu button does not render on desktop view', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(max-width: 936px)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  renderWithProviders(<TopNav navItems={mockNavItems} />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
