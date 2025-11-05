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
  ariaDisabled?: boolean | string;
  ariaHasPopup?: boolean;
  ariaControls?: string;
  tabIndex?: number;
  ariaExpanded?: boolean;
  id?: string;
  dataFn?: string;
  dataIcon?: string;
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
      ariaDisabled,
      ariaHasPopup,
      ariaControls,
      tabIndex,
      ariaExpanded,
      id,
      dataFn,
      dataIcon,
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

    // Convert ariaDisabled to the proper type React expects
    // Priority: explicit ariaDisabled prop, then fall back to disabled prop
    const ariaDisabledAttr = 
      ariaDisabled === 'true' || ariaDisabled === true 
        ? true 
        : ariaDisabled === undefined && disabled 
          ? true 
          : undefined;

    return (
      <button
        ref={ref}
        id={id}
        aria-label={a11yLabel ? a11yLabel : undefined}
        aria-disabled={ariaDisabledAttr}
        data-size={size}
        data-fn={dataFn || undefined}
        data-icon={dataIcon || undefined}
        type={type}
        aria-hidden={ariaHidden || undefined}
        aria-haspopup={ariaHasPopup || undefined}
        aria-controls={ariaControls || undefined}
        tabIndex={tabIndex || undefined}
        aria-expanded={ariaExpanded}
        disabled={disabled || undefined}
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
