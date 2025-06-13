import React, { forwardRef } from 'react';
import { Icon } from 'shared/Icons';
import { getIcon } from 'utils/getIcon';
import { ButtonSize, ButtonType } from '../button-types';

import './icon-button.scss';

interface TMOIconButton {
  a11yLabel: string;
  icon: Icon;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  ariaHidden?: boolean;
  ariaHasPopup?: boolean;
  ariaControls?: string;
  tabIndex?: number;
  ariaExpanded?: boolean;
  id?: string;
  hasBadge?: boolean;
  badgeNumber?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = forwardRef<HTMLButtonElement, TMOIconButton>(
  (
    {
      a11yLabel,
      icon,
      disabled = false,
      size = ButtonSize.large,
      type = ButtonType.button,
      ariaHidden,
      ariaHasPopup,
      ariaControls,
      tabIndex,
      ariaExpanded,
      id,
      hasBadge = false,
      badgeNumber = 0,
      onClick,
    },
    ref
  ) => {
    if (hasBadge && badgeNumber > 0) {
      a11yLabel = `${a11yLabel}, ${badgeNumber >= 100 ? '99+' : badgeNumber}`;
    }

    const IconComponent = icon ? getIcon(icon) : null;

    return (
      <button
        ref={ref}
        id={id}
        aria-label={a11yLabel ? a11yLabel : undefined}
        aria-disabled={disabled || undefined}
        data-size={size}
        type={type}
        aria-hidden={ariaHidden || undefined}
        aria-haspopup={ariaHasPopup || undefined}
        aria-controls={ariaControls || undefined}
        tabIndex={tabIndex || undefined}
        aria-expanded={ariaExpanded}
        disabled={disabled}
        className="MagentaA11y-icon-button"
        onClick={onClick}>
        {IconComponent && <IconComponent width="24" height="24" />}

        {hasBadge && badgeNumber >= 0 && (
          <span
            className={`MagentaA11y-badge ${
              badgeNumber ? 'MagentaA11y-badge--number' : ''
            }`}>
            {badgeNumber > 99 ? '99+' : badgeNumber || null}
          </span>
        )}
      </button>
    );
  }
);

// Set display name for debugging
IconButton.displayName = 'IconButton';

export default IconButton;
