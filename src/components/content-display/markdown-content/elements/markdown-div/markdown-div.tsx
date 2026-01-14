import React from 'react';
import { MarkdownDivProps } from './markdown-div.types';

export const MarkdownDiv: React.FC<MarkdownDivProps> = ({
  children,
  role,
  tabIndex,
  markdownFunctionMap,
  'data-fn': fnKey,
  'data-event': eventType = 'onClick',
  ...props
}) => {
  const handler = fnKey && markdownFunctionMap[fnKey];

  if (!fnKey || !handler) {
    return <div {...props}>{children}</div>;
  }

  const commonProps = {
    ...props,
    role: role || 'button',
    tabIndex: tabIndex ?? 0,
    children,
  };

  const eventHandlers = {
    onMouseDown: eventType === 'onMouseDown' ? handler : undefined,
    onMouseUp: eventType === 'onMouseUp' ? handler : undefined,
    onClick: eventType === 'onClick' ? handler : undefined,
  };

  return <div {...commonProps} {...eventHandlers} />;
};
