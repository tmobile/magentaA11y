export enum OrientationEnum {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export enum DividerModifiers {
  BRANDED = 'MagentaA11y-divider--branded',
  STRONG = 'MagentaA11y-divider--strong',
}

export type TDivider = {
  className?: DividerModifiers;
  orientation: OrientationEnum;
};
