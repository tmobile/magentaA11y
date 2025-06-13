import { fireEvent, render, screen } from '@testing-library/react';
import Chips from './chips';
import { ChipSize, ChipType, IChipSelectable } from './chips.types';

describe('Chips Component', () => {
  test('renders the Chips component', () => {
    const chips: IChipSelectable[] = [
      { id: '1', label: 'Chip 1' },
      { id: '2', label: 'Chip 2' },
    ];

    render(
      <Chips
        chips={chips}
        legend="Test Legend"
        name="test"
        size={ChipSize.SMALL}
        onSelect={jest.fn()}
        onDelete={jest.fn()}
        variant={ChipType.TOGGLE}
      />
    );

    const chipElements = screen.getAllByRole('button', { name: /remove/i });
    expect(chipElements.length).toBe(2);
  });

  test('renders the legend when provided', () => {
    const chips: IChipSelectable[] = [
      { id: '1', label: 'Chip 1' },
      { id: '2', label: 'Chip 2' },
    ];

    render(
      <Chips
        chips={chips}
        legend="Test Legend"
        name="test"
        size={ChipSize.SMALL}
        onSelect={jest.fn()}
        onDelete={jest.fn()}
        variant={ChipType.TOGGLE}
      />
    );

    const legendElement = screen.getByText('Test Legend');
    expect(legendElement).toBeInTheDocument();
  });

  test('calls onDelete when a chip is clicked', () => {
    const chips: IChipSelectable[] = [
      { id: '1', label: 'Chip 1' },
      { id: '2', label: 'Chip 2' },
    ];
    const onDeleteMock = jest.fn();

    render(
      <Chips
        chips={chips}
        legend="Test Legend"
        name="test"
        size={ChipSize.SMALL}
        onSelect={jest.fn()}
        onDelete={onDeleteMock}
        variant={ChipType.TOGGLE}
      />
    );

    const chipButtons = screen.getAllByRole('button', { name: /remove/i });

    fireEvent.click(chipButtons[0]);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith('1');
  });

  test('does not render fieldset when there are no chips', () => {
    render(
      <Chips
        chips={[]} // No chips provided
        legend="Test Legend"
        name="test"
        size={ChipSize.SMALL}
        onSelect={jest.fn()}
        onDelete={jest.fn()}
        variant={ChipType.TOGGLE}
      />
    );

    const fieldset = screen.queryByRole('group');
    expect(fieldset).not.toBeInTheDocument();
  });
});
