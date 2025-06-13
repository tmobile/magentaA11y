import { fireEvent, render, screen } from '@testing-library/react';
import { ButtonSize, ButtonType, ButtonVariant } from '../button-types';
import Button from './button';
import userEvent from '@testing-library/user-event';

describe('Button Component - Basic Rendering', () => {
  test('renders the button with the provided label', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Click Me"
      />
    );

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
  });

  test('renders the button with a valid a11yLabel', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Click Me"
        a11yLabel="Accessible Button"
      />
    );

    const button = screen.getByRole('button', { name: 'Accessible Button' });
    expect(button).toBeInTheDocument();
  });

  test('does not render when label is empty', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label=""
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('Button Component - Accessibility & ARIA Attributes', () => {
  test('sets the correct aria-label when provided', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Click Me"
        a11yLabel="Accessible Button"
      />
    );

    const button = screen.getByRole('button', { name: 'Accessible Button' });
    expect(button).toBeInTheDocument();
  });

  test('sets aria-disabled when the button is disabled', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Click Me"
        disabled={true}
      />
    );

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('sets aria-describedby when provided', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Click Me"
        describedBy="description-id"
      />
    );

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toHaveAttribute('aria-describedby', 'description-id');
  });
});

describe('Button Component - Functional Behavior', () => {
  test('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    render(
      <Button
        onClick={onClickMock}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Click Me"
      />
    );

    const button = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const onClickMock = jest.fn();
    render(
      <Button
        onClick={onClickMock}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Click Me"
        disabled
      />
    );

    const button = screen.getByRole('button', { name: 'Click Me' });

    userEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });

  test('renders with correct type attribute', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.submit}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Submit"
      />
    );

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toHaveAttribute('type', 'submit');
  });
});

describe('Button Component - Attribute & Class Tests', () => {
  test('applies the correct data-size attribute', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Size Test"
      />
    );

    const button = screen.getByRole('button', { name: 'Size Test' });
    expect(button).toHaveAttribute('data-size', 'large');
  });

  test('applies the correct data-size small attribute', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.small}
        label="Size Test"
      />
    );

    const button = screen.getByRole('button', { name: 'Size Test' });
    expect(button).toHaveAttribute('data-size', 'small');
  });

  test('applies the correct type attribute', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.submit}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Type Test"
      />
    );

    const button = screen.getByRole('button', { name: 'Type Test' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('applies the correct aria-describedby attribute when provided', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="Described Button"
        describedBy="description-id"
      />
    );

    const button = screen.getByRole('button', { name: 'Described Button' });
    expect(button).toHaveAttribute('aria-describedby', 'description-id');
  });

  test('applies the correct id when provided', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="ID Test"
        id="test-button-id"
      />
    );

    const button = screen.getByRole('button', { name: 'ID Test' });
    expect(button).toHaveAttribute('id', 'test-button-id');
  });

  test('applies the correct class based on the variant', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.secondary}
        size={ButtonSize.large}
        label="Class Test"
      />
    );

    const button = screen.getByRole('button', { name: 'Class Test' });
    expect(button).toHaveClass('Magentaa11y-button');
    expect(button).toHaveClass('Magentaa11y-button--secondary');
  });

  test('does not add unnecessary attributes when they are undefined', () => {
    render(
      <Button
        onClick={jest.fn()}
        type={ButtonType.button}
        variant={ButtonVariant.primary}
        size={ButtonSize.large}
        label="No Extra Attrs"
      />
    );

    const button = screen.getByRole('button', { name: 'No Extra Attrs' });

    expect(button).not.toHaveAttribute('id');
    expect(button).not.toHaveAttribute('aria-describedby');
  });
});
