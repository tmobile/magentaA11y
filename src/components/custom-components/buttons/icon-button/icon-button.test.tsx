import { fireEvent, render, screen } from '@testing-library/react';
import { Icons } from 'shared/Icons';
import { ButtonSize, ButtonType } from '../button-types';
import IconButton from './icon-button';

describe('IconButton Component - Basic Rendering', () => {
  test('renders the button when a valid a11yLabel is provided', () => {
    render(
      <IconButton
        a11yLabel="Test Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
      />
    );

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
  });
});

describe('IconButton Component - Accessibility & ARIA Attributes', () => {
  test('sets the aria-disabled attribute when disabled', () => {
    render(
      <IconButton
        a11yLabel="Disabled Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        disabled
      />
    );

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });

  test('sets aria-haspopup when provided', () => {
    render(
      <IconButton
        a11yLabel="Menu Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        ariaHasPopup
      />
    );

    const button = screen.getByRole('button', { name: 'Menu Button' });
    expect(button).toHaveAttribute('aria-haspopup', 'true');
  });

  test('sets aria-controls when provided', () => {
    render(
      <IconButton
        a11yLabel="Controls Menu"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        ariaControls="menu-id"
      />
    );

    const button = screen.getByRole('button', { name: 'Controls Menu' });
    expect(button).toHaveAttribute('aria-controls', 'menu-id');
  });

  test('sets aria-expanded when provided', () => {
    render(
      <IconButton
        a11yLabel="Expandable Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        ariaExpanded
      />
    );

    const button = screen.getByRole('button', { name: 'Expandable Button' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  test('does not set aria-expanded when not provided', () => {
    render(
      <IconButton
        a11yLabel="Non-expandable Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
      />
    );

    const button = screen.getByRole('button', {
      name: 'Non-expandable Button',
    });
    expect(button).not.toHaveAttribute('aria-expanded');
  });

  test('does not set aria-hidden when not provided', () => {
    render(
      <IconButton
        a11yLabel="Visible Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
      />
    );

    const button = screen.getByRole('button', { name: 'Visible Button' });
    expect(button).not.toHaveAttribute('aria-hidden');
  });
});

describe('IconButton Component - Functional Behavior', () => {
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(
      <IconButton
        a11yLabel="Clickable Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Clickable Button' });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();

    render(
      <IconButton
        a11yLabel="Disabled Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        disabled
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: 'Disabled Button' });

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders a badge when hasBadge is true and displays the correct number', () => {
    render(
      <IconButton
        a11yLabel="Notification Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        hasBadge
        badgeNumber={5}
      />
    );

    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('MagentaA11y-badge--number');
  });

  test('renders a "99+" badge when badgeNumber is 100 or greater', () => {
    render(
      <IconButton
        a11yLabel="Max Badge Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        hasBadge
        badgeNumber={120}
      />
    );

    const badge = screen.getByText('99+');
    expect(badge).toBeInTheDocument();
  });

  test('does not render a badge when hasBadge is false', () => {
    render(
      <IconButton
        a11yLabel="No Badge Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.large}
        type={ButtonType.button}
        hasBadge={false}
      />
    );

    expect(screen.queryByText('99+')).not.toBeInTheDocument();
  });
});

describe('IconButton Component - Attribute & Class Tests', () => {
  test('applies the correct data-size attribute based on size prop', () => {
    render(
      <IconButton
        a11yLabel="Sized Button"
        icon={Icons.abcOutlined}
        size={ButtonSize.small}
        type={ButtonType.button}
      />
    );

    const button = screen.getByRole('button', { name: 'Sized Button' });
    expect(button).toHaveAttribute('data-size', 'small');
  });

  test('applies the correct type attribute based on type prop', () => {
    render(
      <IconButton
        a11yLabel="Submit Button"
        icon={Icons.abcOutlined}
        type={ButtonType.submit}
      />
    );

    const button = screen.getByRole('button', { name: 'Submit Button' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('applies disabled attribute when disabled prop is true', () => {
    render(
      <IconButton
        a11yLabel="Disabled Button"
        icon={Icons.abcOutlined}
        disabled
      />
    );

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  test('applies aria-haspopup when ariaHasPopup prop is true', () => {
    render(
      <IconButton
        a11yLabel="Popup Button"
        icon={Icons.abcOutlined}
        ariaHasPopup
      />
    );

    const button = screen.getByRole('button', { name: 'Popup Button' });
    expect(button).toHaveAttribute('aria-haspopup', 'true');
  });

  test('applies aria-expanded when ariaExpanded prop is true', () => {
    render(
      <IconButton
        a11yLabel="Expandable Button"
        icon={Icons.abcOutlined}
        ariaExpanded
      />
    );

    const button = screen.getByRole('button', { name: 'Expandable Button' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  test('applies aria-controls when ariaControls is provided', () => {
    render(
      <IconButton
        a11yLabel="Controlled Button"
        icon={Icons.abcOutlined}
        ariaControls="test-id"
      />
    );

    const button = screen.getByRole('button', { name: 'Controlled Button' });
    expect(button).toHaveAttribute('aria-controls', 'test-id');
  });

  test('applies tabIndex when provided', () => {
    render(
      <IconButton
        a11yLabel="Tab Indexed Button"
        icon={Icons.abcOutlined}
        tabIndex={-1}
      />
    );

    const button = screen.getByRole('button', { name: 'Tab Indexed Button' });
    expect(button).toHaveAttribute('tabindex', '-1');
  });

  test('applies correct CSS classes based on props', () => {
    render(
      <IconButton a11yLabel="Styled Button" icon={Icons.abcOutlined} hasBadge />
    );

    const button = screen.getByRole('button', { name: 'Styled Button' });
    expect(button).toHaveClass('MagentaA11y-icon-button');
  });
});

describe('IconButton Component - Edge Cases', () => {
  test('handles null or undefined values for optional props', () => {
    render(
      <IconButton
        a11yLabel="Edge Case Button"
        icon={Icons.abcOutlined}
        size={undefined}
        type={undefined}
      />
    );

    const button = screen.getByRole('button', { name: 'Edge Case Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-size', 'large');
  });

  test('does not crash when badgeNumber is negative', () => {
    render(
      <IconButton
        a11yLabel="Negative Badge Button"
        icon={Icons.abcOutlined}
        hasBadge
        badgeNumber={-5}
      />
    );

    const button = screen.getByRole('button', {
      name: 'Negative Badge Button',
    });
    expect(button).toBeInTheDocument();
    expect(screen.queryByText('-5')).not.toBeInTheDocument();
  });

  test('displays "99+" when badgeNumber is over 99', () => {
    render(
      <IconButton
        a11yLabel="High Badge Button"
        icon={Icons.abcOutlined}
        hasBadge
        badgeNumber={120}
      />
    );

    const badge = screen.getByText('99+');
    expect(badge).toBeInTheDocument();
  });

  test('handles an extremely long a11yLabel gracefully', () => {
    const longLabel = 'A'.repeat(300);
    render(<IconButton a11yLabel={longLabel} icon={Icons.abcOutlined} />);

    const button = screen.getByRole('button', { name: longLabel });
    expect(button).toBeInTheDocument();
  });

  test('does not trigger onClick when disabled', () => {
    const onClickMock = jest.fn();

    render(
      <IconButton
        a11yLabel="Disabled Button"
        icon={Icons.abcOutlined}
        disabled
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    fireEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
