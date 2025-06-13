import { cleanup, render, screen } from '@testing-library/react';
import Divider from './divider';
import { DividerModifiers, OrientationEnum } from './divider.types';

describe('Divider Component', () => {
  afterEach(cleanup);
  test('renders the Divider component', () => {
    render(<Divider orientation={OrientationEnum.HORIZONTAL} />);
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toBeInTheDocument();
  });

  test('applies both BRANDED and STRONG classes when both are provided', () => {
    render(
      <Divider
        orientation={OrientationEnum.HORIZONTAL}
        className={DividerModifiers.STRONG}
      />
    );
    const divider = screen.getByRole('separator', { hidden: true });

    expect(divider).toHaveClass('MagentaA11y-divider', DividerModifiers.STRONG);
  });

  test('sets the correct data-orientation attribute based on the prop', () => {
    render(<Divider orientation={OrientationEnum.VERTICAL} />);
    const divider = screen.getByRole('separator', { hidden: true });

    expect(divider).toHaveAttribute('data-orientation', 'vertical');
  });

  test('has aria-hidden attribute set to true', () => {
    render(<Divider orientation={OrientationEnum.HORIZONTAL} />);
    const divider = screen.getByRole('separator', { hidden: true });

    expect(divider).toHaveAttribute('aria-hidden', 'true');
  });

  test('does not apply extra classes when className is undefined', () => {
    render(<Divider orientation={OrientationEnum.HORIZONTAL} />);
    const divider = screen.getByRole('separator', { hidden: true });

    expect(divider).toHaveClass('MagentaA11y-divider');
    expect(divider.classList.length).toBe(1);
  });

  test('applies correct class when className prop is provided', () => {
    render(
      <Divider
        orientation={OrientationEnum.HORIZONTAL}
        className={DividerModifiers.BRANDED}
      />
    );
    const divider = screen.getByRole('separator', { hidden: true });

    expect(divider).toHaveClass(
      'MagentaA11y-divider',
      DividerModifiers.BRANDED
    );

    cleanup();

    render(
      <Divider
        orientation={OrientationEnum.HORIZONTAL}
        className={DividerModifiers.STRONG}
      />
    );
    const strongDivider = screen.getByRole('separator', { hidden: true });

    expect(strongDivider).toHaveClass(
      'MagentaA11y-divider',
      DividerModifiers.STRONG
    );
  });

  test('does not apply unrecognized className values', () => {
    render(
      <Divider
        orientation={OrientationEnum.HORIZONTAL}
        className={'random-class' as any}
      />
    );
    const divider = screen.getByRole('separator', { hidden: true });

    expect(divider).not.toHaveClass('random-class');
    expect(divider).toHaveClass('MagentaA11y-divider');
  });
});
