export enum ChipType {
  TOGGLE = 'toggle',
  RADIO = 'radio',
  BUTTON = 'button',
}

export enum ChipInputType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

export enum ChipSize {
  SMALL = 'small',
  XS = 'xs',
}

export interface IChip {
  id: string;
  label: string;
}

export interface IChipSelectable extends IChip {
  checked?: boolean;
  isUnavailable?: boolean;
  name?: string;
  onDelete?: (id: string) => void;
  onSelect?: (id: string, checked: boolean) => void;
}

export interface IChipGroup {
  variant: ChipType;
  chips: IChipSelectable[];
  legend?: string;
  name?: string;
  size: ChipSize;
  onDelete: (id: string) => void;
  onSelect?: (id: string, checked: boolean) => void;
}
