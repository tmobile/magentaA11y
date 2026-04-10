import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { MarkdownInput } from './markdown-input';

const emptyFunctionMap = {};

/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

describe('MarkdownInput - range slider', () => {
  test('slider value stays at new position after change (uncontrolled behavior)', () => {
    // Bug: if value is passed as a controlled React prop with no state update,
    // React resets input.value back to the original after onChange fires.
    const { container } = render(
      <MarkdownInput
        type="range"
        min="0"
        max="10"
        value="10"
        markdownFunctionMap={emptyFunctionMap}
      />
    );

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('10');

    fireEvent.change(input, { target: { value: '3' } });

    // Controlled with no state update → resets to '10' (broken)
    // Uncontrolled (defaultValue) → stays at '3' (correct)
    expect(input.value).toBe('3');
  });

  test('forwards aria-disabled to the input element', () => {
    const { container } = render(
      <MarkdownInput
        type="range"
        aria-disabled="true"
        markdownFunctionMap={emptyFunctionMap}
      />
    );

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  test('syncs .range-value text when slider moves', () => {
    const { container } = render(
      <div className="range-group">
        <span className="range-value">5</span>
        <MarkdownInput
          type="range"
          min="0"
          max="10"
          markdownFunctionMap={emptyFunctionMap}
        />
      </div>
    );

    const input = container.querySelector('input') as HTMLInputElement;
    const valueEl = container.querySelector('.range-value') as HTMLElement;

    fireEvent.input(input, { target: { value: '8' } });

    expect(valueEl.textContent).toBe('8');
  });
});
/* eslint-enable testing-library/no-node-access */
/* eslint-enable testing-library/no-container */
