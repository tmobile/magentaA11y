import { render, fireEvent } from '@testing-library/react';
import { MarkdownTextarea } from './markdown-textarea';

const emptyFunctionMap = {};

/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

describe('MarkdownTextarea', () => {
  test('renders a textarea element', () => {
    const { container } = render(
      <MarkdownTextarea markdownFunctionMap={emptyFunctionMap} />
    );
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  test('calls the mapped function on input', () => {
    const fn = jest.fn();
    const { container } = render(
      <MarkdownTextarea
        data-fn="charCounter"
        data-event="onInput"
        markdownFunctionMap={{ charCounter: fn }}
      />
    );

    fireEvent.input(container.querySelector('textarea')!);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('does not throw when no data-fn is provided', () => {
    expect(() =>
      render(<MarkdownTextarea markdownFunctionMap={emptyFunctionMap} />)
    ).not.toThrow();
  });

  /* eslint-enable testing-library/no-node-access */
  /* eslint-enable testing-library/no-container */
});

