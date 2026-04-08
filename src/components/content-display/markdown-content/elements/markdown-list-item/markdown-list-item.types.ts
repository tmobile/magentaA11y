import React from 'react';

export interface MarkdownListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string;
  children?: React.ReactNode;
}
