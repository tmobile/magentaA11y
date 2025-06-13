import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SkipLink from './SkipLink';

const renderWithRouter = (
  ui: React.ReactElement,
  { initialEntries = ['/'] } = {}
) => {
  return render(
    <MemoryRouter
      initialEntries={initialEntries}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      {ui}
    </MemoryRouter>
  );
};

describe('SkipLink Component', () => {
  test('renders the SkipLink button', () => {
    const mainContentRef = createRef<HTMLDivElement>();
    renderWithRouter(<SkipLink mainContentRef={mainContentRef} />);

    expect(
      screen.getByRole('button', { name: /skip to main content/i })
    ).toBeInTheDocument();
  });

  test('focuses on the main content when SkipLink button is clicked', () => {
    const mainContentRef = { current: document.createElement('div') };
    mainContentRef.current.setAttribute('tabindex', '-1');
    document.body.appendChild(mainContentRef.current);

    renderWithRouter(<SkipLink mainContentRef={mainContentRef} />);

    fireEvent.click(
      screen.getByRole('button', { name: /skip to main content/i })
    );
    expect(mainContentRef.current).toHaveFocus();

    document.body.removeChild(mainContentRef.current);
  });

  test('does not focus the SkipLink button when isKeyboardNavigation is false', () => {
    const mainContentRef = createRef<HTMLDivElement>();
    renderWithRouter(<SkipLink mainContentRef={mainContentRef} />);

    expect(
      screen.getByRole('button', { name: /skip to main content/i })
    ).not.toHaveFocus();
  });

  test('clicking SkipLink does nothing if mainContentRef is null', () => {
    const mainContentRef = { current: null };
    renderWithRouter(<SkipLink mainContentRef={mainContentRef} />);

    fireEvent.click(
      screen.getByRole('button', { name: /skip to main content/i })
    );
    expect(
      screen.getByRole('button', { name: /skip to main content/i })
    ).not.toHaveFocus();
  });

  test('does not render an aria-live message for root path', () => {
    const mainContentRef = createRef<HTMLDivElement>();
    renderWithRouter(
      <SkipLink
        mainContentRef={mainContentRef}
        liveRegionTestId="live-region"
      />,
      { initialEntries: ['/'] }
    );

    expect(screen.getByTestId('live-region')).toBeEmptyDOMElement();
  });

  test('renders an aria-live message for a non-root path', () => {
    const mainContentRef = createRef<HTMLDivElement>();
    renderWithRouter(
      <SkipLink
        mainContentRef={mainContentRef}
        liveRegionTestId="live-region"
      />,
      { initialEntries: ['/components/button'] }
    );

    expect(screen.getByTestId('live-region')).toHaveTextContent(
      'components "button page"'
    );
  });

  const TestWrapper = ({
    mainContentRef,
  }: {
    mainContentRef: React.RefObject<HTMLDivElement>;
  }) => {
    const navigate = useNavigate();
    return (
      <>
        <button onClick={() => navigate('/patterns/forms')}>Go to Forms</button>
        <SkipLink
          mainContentRef={mainContentRef}
          liveRegionTestId="live-region"
        />
      </>
    );
  };

  test('updates aria-live message when navigating to a new path', async () => {
    const mainContentRef = createRef<HTMLDivElement>();

    renderWithRouter(
      <Routes>
        <Route
          path="/*"
          element={<TestWrapper mainContentRef={mainContentRef} />}
        />
      </Routes>,
      { initialEntries: ['/components/button'] }
    );

    expect(screen.getByTestId('live-region')).toHaveTextContent(
      'components "button page"'
    );

    fireEvent.click(screen.getByRole('button', { name: /go to forms/i }));

    await waitFor(() => {
      expect(screen.getByTestId('live-region')).toHaveTextContent(
        'patterns "forms page"'
      );
    });
  });

  test('formats aria-live message correctly for multi-segment paths', () => {
    const mainContentRef = createRef<HTMLDivElement>();
    renderWithRouter(
      <SkipLink
        mainContentRef={mainContentRef}
        liveRegionTestId="live-region"
      />,
      { initialEntries: ['/guidelines/typography/overview'] }
    );

    expect(screen.getByTestId('live-region')).toHaveTextContent(
      'guidelines "typography overview page"'
    );
  });

  test('formats hyphenated paths correctly in aria-live message', () => {
    const mainContentRef = createRef<HTMLDivElement>();
    renderWithRouter(
      <SkipLink
        mainContentRef={mainContentRef}
        liveRegionTestId="live-region"
      />,
      { initialEntries: ['/components/skip-link'] }
    );

    expect(screen.getByTestId('live-region')).toHaveTextContent(
      'components "skip link page"'
    );
  });

  test('ensures aria-live region has correct attributes', () => {
    const mainContentRef = createRef<HTMLDivElement>();
    renderWithRouter(
      <SkipLink
        mainContentRef={mainContentRef}
        liveRegionTestId="live-region"
      />,
      { initialEntries: ['/components/button'] }
    );

    const liveRegion = screen.getByTestId('live-region');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  describe('SkipLink Component - Snapshot Test', () => {
    test('matches the snapshot', () => {
      const mainContentRef = createRef<HTMLDivElement>();

      const { asFragment } = renderWithRouter(
        <SkipLink mainContentRef={mainContentRef} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
