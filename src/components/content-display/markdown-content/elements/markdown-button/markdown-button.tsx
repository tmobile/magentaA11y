import React from 'react';
import { ButtonType } from 'components/custom-components/buttons/button-types';
import IconButton from 'components/custom-components/buttons/icon-button/icon-button';
import { Icon } from 'shared/Icons';
import { MarkdownButtonProps } from './markdown-button.types';

const isValidButtonType = (type: ButtonType | string | undefined): type is ButtonType => {
  return type === ButtonType.button || type === ButtonType.submit || type === ButtonType.reset;
};

export const MarkdownButton: React.FC<MarkdownButtonProps> = ({
  children,
  markdownFunctionMap,
  'data-fn': fnKey,
  'data-icon': iconName,
  'aria-label': a11yLabel,
  'aria-disabled': ariaDisabled,
  type: nativeType,
  ...props
}) => {
  const fn = fnKey && markdownFunctionMap[fnKey];
  const onClick = typeof fn === 'function'
    ? (event: React.MouseEvent) => fn(event)
    : undefined;

  /*
    Set aria-disabled when explicitly provided as true. We check both string 'true'
    and boolean true because markdown parsing can convert boolean values to strings.
  */
  let ariaDisabledAttr;
  if (ariaDisabled === 'true' || ariaDisabled === true) {
    ariaDisabledAttr = true;
  } else {
    ariaDisabledAttr = undefined;
  }

  // Icon button variant
  if (iconName) {
    return (
      <IconButton
        icon={iconName as Icon}
        onClick={onClick}
        a11yLabel={a11yLabel || ''}
        ariaDisabled={ariaDisabled}
        dataFn={fnKey}
        dataIcon={iconName as string}
        type={isValidButtonType(nativeType) ? nativeType : undefined}
      />
    );
  }

  // Function-mapped button
  if (onClick) {
    return (
      <button onClick={onClick} aria-disabled={ariaDisabledAttr} {...props}>
        {children}
      </button>
    );
  }

  // Plain button
  return <button aria-disabled={ariaDisabledAttr} {...props}>{children}</button>;
};
