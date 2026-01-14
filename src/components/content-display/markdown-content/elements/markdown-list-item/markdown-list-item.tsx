import React from 'react';
import { MarkdownListItemProps } from './markdown-list-item.types';

const isInteractiveCard = (className?: string): boolean => {
  return typeof className === 'string' &&
         className.includes('card') &&
         className.includes('interactive');
};

const handleCardClick = (e: React.MouseEvent<HTMLLIElement>) => {
  const currentTarget = e.currentTarget as HTMLElement;

  const input = currentTarget.querySelector(
    'input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), input:not([disabled])'
  ) as HTMLInputElement | null;

  if (!input) return;

  const label = input.id
    ? currentTarget.querySelector(`label[for="${CSS.escape(input.id)}"]`) as HTMLElement | null
    : null;

  if (label) {
    label.click();
  } else {
    input.focus();
    input.click();
  }
};

export const MarkdownListItem: React.FC<MarkdownListItemProps> = ({
  className,
  children,
  ...rest
}) => {
  if (!isInteractiveCard(className)) {
    return <li className={className} {...rest}>{children}</li>;
  }

  return (
    <li className={className} onClick={handleCardClick} {...rest}>
      {children}
    </li>
  );
};
