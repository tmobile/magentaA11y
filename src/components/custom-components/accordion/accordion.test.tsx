import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './accordion';

describe('Accordion Component - Basic Rendering', () => {
  test('renders the accordion with the given title', () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        Content
      </Accordion>
    );

    const button = screen.getByRole('button', { name: 'Test Accordion' });
    expect(button).toBeInTheDocument();
  });

  test('renders the content inside the accordion when isOpened is true', () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={true}>
        Content
      </Accordion>
    );

    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
  });

  test('does not render content when isOpened is false', () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        Content
      </Accordion>
    );

    const content = screen.queryByText('Content');
    expect(content).not.toBeInTheDocument();
  });
});

describe('Accordion Component - Accessibility & ARIA Attributes', () => {
  test('button has correct aria-expanded attribute when opened', () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={true}>
        Content
      </Accordion>
    );

    const button = screen.getByRole('button', { name: 'Test Accordion' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  test('button has correct aria-expanded attribute when closed', () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        Content
      </Accordion>
    );

    const button = screen.getByRole('button', { name: 'Test Accordion' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('content is not rendered when aria-expanded is false', () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        Content
      </Accordion>
    );

    const content = screen.queryByText('Content');
    expect(content).not.toBeInTheDocument();
  });
});

describe('Accordion Component - Functional Behavior', () => {
  test('calls onToggle with the correct value when clicked', async () => {
    const onToggleMock = jest.fn();
    render(
      <Accordion
        title="Test Accordion"
        id="accordion1"
        isOpened={false}
        onToggle={onToggleMock}>
        Content
      </Accordion>
    );

    const button = screen.getByRole('button', { name: 'Test Accordion' });

    await userEvent.click(button);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
    expect(onToggleMock).toHaveBeenCalledWith(true);
  });

  test('toggles content visibility when clicked', async () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        Content
      </Accordion>
    );

    const button = screen.getByRole('button', { name: 'Test Accordion' });

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    await userEvent.click(button);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('button toggles aria-expanded attribute correctly', async () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        Content
      </Accordion>
    );

    const button = screen.getByRole('button', { name: 'Test Accordion' });

    expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Accordion Component - Attribute & Class Tests', () => {
  test('applies the correct class to the button', () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        Content
      </Accordion>
    );

    const button = screen.getByRole('button', { name: 'Test Accordion' });
    expect(button).toHaveClass('MagentaA11y-accordion__headline');
  });

  test('does not render content container when closed', () => {
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        Content
      </Accordion>
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

});

describe('Accordion Component - Edge Cases', () => {
  test('handles rapid consecutive clicks without breaking', async () => {
    const user = userEvent.setup();
    render(
      <Accordion title="Test Accordion" id="accordion1" isOpened={false}>
        <p>Accordion Content</p>
      </Accordion>
    );

    const toggleButton = screen.getByRole('button', { name: 'Test Accordion' });

    await user.click(toggleButton);
    await user.click(toggleButton);
    await user.click(toggleButton);
    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute('aria-expanded', expect.any(String));
  });
});
