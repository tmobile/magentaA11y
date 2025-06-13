import React from 'react';
import { DividerModifiers, TDivider } from './divider.types';

import './divider.scss';

const Divider: React.FC<TDivider> = ({ orientation, className }) => {
  const getDividerClasses = (
    className: DividerModifiers | undefined
  ): string => {
    const classes = ['MagentaA11y-divider'];

    if (className === DividerModifiers.BRANDED) {
      classes.push(DividerModifiers.BRANDED);
    }

    if (className === DividerModifiers.STRONG) {
      classes.push(DividerModifiers.STRONG);
    }

    return classes.join(' ');
  };

  return (
    <div
      className={getDividerClasses(className)}
      data-orientation={orientation}
      role="separator"
      aria-hidden="true"></div>
  );
};

export default Divider;
