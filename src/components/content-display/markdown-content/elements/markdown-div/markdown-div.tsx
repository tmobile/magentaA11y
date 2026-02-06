import React from 'react';
import { MarkdownDivProps } from './markdown-div.types';

/**
 * Component for rendering div elements within markdown content.
 * If data-fn is provided, it turns the div into an interactive element (role="button" by default).
 * Supports onClick, onMouseDown, and onMouseUp events via data-event.
 */
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

  // If no function mapping is provided, render a plain div
  if (!fnKey || !handler) {
    return <div {...props}>{children}</div>;
  }

  // Interactive div configuration
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
