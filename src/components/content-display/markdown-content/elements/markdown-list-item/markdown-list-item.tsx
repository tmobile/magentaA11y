import React from 'react';
import { MarkdownListItemProps } from './markdown-list-item.types';

/**
 * Checks if a list item should be treated as an interactive card.
 */
const isInteractiveCard = (className?: string): boolean => {
  return typeof className === 'string' &&
         className.includes('card') &&
         className.includes('interactive');
};

/**
 * Handles clicks on interactive cards by delegating to the nested input or its label.
 */
const handleCardClick = (e: React.MouseEvent<HTMLLIElement>) => {
  const currentTarget = e.currentTarget as HTMLElement;

  // Find any interactive input inside the card
  const input = currentTarget.querySelector(
    'input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), input:not([disabled])'
  ) as HTMLInputElement | null;

  if (!input) return;

  // Try to find a label associated with the input
  const label = input.id
    ? currentTarget.querySelector(`label[for="${CSS.escape(input.id)}"]`) as HTMLElement | null
    : null;

  if (label) {
    label.click();
  } else {
    // Fallback to focusing and clicking the input directly
    input.focus();
    input.click();
  }
};

/**
 * Component for rendering list items within markdown content.
 * Adds special handling for interactive card-style list items.
 */
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
