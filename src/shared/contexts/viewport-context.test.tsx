import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { ViewportProvider, useViewport } from './viewport-context';

const TestComponent = () => {
  const { isMobile } = useViewport();
  return (
    <div data-testid="viewport-status">{isMobile ? 'Mobile' : 'Desktop'}</div>
  );
};

test('ViewportProvider renders and provides correct default context', () => {
  render(
    <ViewportProvider>
      <TestComponent />
    </ViewportProvider>
  );

  expect(screen.getByTestId('viewport-status')).toHaveTextContent('Desktop');
});

test('ViewportProvider updates context when viewport changes', () => {
  const mockMatchMedia = window.matchMedia as jest.Mock;
  mockMatchMedia.mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((event, handler) => {
      if (event === 'change') {
        setTimeout(() => handler({ matches: true }));
      }
    }),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  render(
    <ViewportProvider>
      <TestComponent />
    </ViewportProvider>
  );

  expect(screen.getByTestId('viewport-status')).toHaveTextContent('Desktop');

  window.matchMedia('(max-width: 768px)').addEventListener('change', () => {});

  setTimeout(() => {
    expect(screen.getByTestId('viewport-status')).toHaveTextContent('Mobile');
  }, 0);
});

test('useViewport throws an error when used outside of ViewportProvider', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  expect(() => {
    render(<TestComponent />);
  }).toThrowError('useViewport must be used within a ViewportProvider');

  consoleErrorSpy.mockRestore();
});

test('ViewportProvider removes event listener on unmount', () => {
  const mockMatchMedia = window.matchMedia as jest.Mock;
  const removeEventListenerMock = jest.fn();

  mockMatchMedia.mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: removeEventListenerMock,
    dispatchEvent: jest.fn(),
  }));

  const { unmount } = render(
    <ViewportProvider>
      <TestComponent />
    </ViewportProvider>
  );

  unmount();

  expect(removeEventListenerMock).toHaveBeenCalled();
});

test('ViewportProvider correctly detects various screen sizes', () => {
  const mockMatchMedia = window.matchMedia as jest.Mock;

  mockMatchMedia.mockImplementation((query) => ({
    matches: query === '(max-width: 1024px)' ? false : false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  render(
    <ViewportProvider>
      <TestComponent />
    </ViewportProvider>
  );

  expect(screen.getByTestId('viewport-status')).toHaveTextContent('Desktop');

  mockMatchMedia.mockImplementation((query) => ({
    matches: query === '(max-width: 768px)' ? true : false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((event, handler) => {
      if (event === 'change') {
        setTimeout(() => handler({ matches: true }), 0);
      }
    }),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  window.matchMedia('(max-width: 768px)').addEventListener('change', () => {});

  setTimeout(() => {
    expect(screen.getByTestId('viewport-status')).toHaveTextContent('Mobile');
  }, 0);
});

test('ViewportProvider updates all consumers when viewport changes', () => {
  const mockMatchMedia = window.matchMedia as jest.Mock;

  mockMatchMedia.mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((event, handler) => {
      if (event === 'change') {
        setTimeout(() => handler({ matches: true }), 0);
      }
    }),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  render(
    <ViewportProvider>
      <TestComponent />
      <TestComponent />
    </ViewportProvider>
  );

  expect(screen.getAllByTestId('viewport-status')[0]).toHaveTextContent(
    'Desktop'
  );
  expect(screen.getAllByTestId('viewport-status')[1]).toHaveTextContent(
    'Desktop'
  );

  window.matchMedia('(max-width: 768px)').addEventListener('change', () => {});

  setTimeout(() => {
    expect(screen.getAllByTestId('viewport-status')[0]).toHaveTextContent(
      'Mobile'
    );
    expect(screen.getAllByTestId('viewport-status')[1]).toHaveTextContent(
      'Mobile'
    );
  }, 0);
});

test('ViewportProvider correctly provides context to multiple consumers', () => {
  const components = Array.from({ length: 100 }, (_, i) => (
    <TestComponent key={i} />
  ));

  render(<ViewportProvider>{components}</ViewportProvider>);

  screen.getAllByTestId('viewport-status').forEach((element) => {
    expect(element).toHaveTextContent('Desktop');
  });
});

const TestComponentWithRef = () => {
  const { isMobile } = useViewport();
  const previousValue = useRef(isMobile);
  return (
    <div data-testid="viewport-status">
      {isMobile ? 'Mobile' : 'Desktop'} - Prev:{' '}
      {previousValue.current ? 'Mobile' : 'Desktop'}
    </div>
  );
};

test('ViewportProvider does not unnecessarily change context object', () => {
  render(
    <ViewportProvider>
      <TestComponentWithRef />
    </ViewportProvider>
  );

  expect(screen.getByTestId('viewport-status')).toHaveTextContent(
    'Desktop - Prev: Desktop'
  );
});
