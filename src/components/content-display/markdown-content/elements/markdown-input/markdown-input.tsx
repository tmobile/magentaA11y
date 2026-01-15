import React from 'react';
import { MarkdownInputProps } from './markdown-input.types';
import { invokeMappedFunction, wrapWithAriaDisabledCheck } from '../utils';

/**
 * Determines if defaultChecked should be used instead of checked for specific input types.
 */
const shouldUseDefaultChecked = (type?: string, role?: string): boolean => {
  return type === 'radio' || role === 'switch';
};

/**
 * Creates event handlers that prevent default actions for aria-disabled inputs.
 */
const createAriaDisabledProps = () => ({
  onClick: (e: React.MouseEvent) => e.preventDefault(),
  onChange: (e: React.ChangeEvent) => e.preventDefault(),
  onKeyDown: (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
    }
  },
});

/**
 * Component for rendering input elements within markdown content.
 * Supports:
 * 1. Function-mapped inputs (via data-fn) with event handling.
 * 2. Static inputs.
 * 3. Proper aria-disabled handling by preventing interactions.
 */
export const MarkdownInput: React.FC<MarkdownInputProps> = ({
  type,
  checked,
  role,
  markdownFunctionMap,
  'data-fn': fnKey,
  'data-event': eventType = 'onChange',
  'aria-disabled': ariaDisabled,
  ...rest
}) => {
  const fn = fnKey && markdownFunctionMap[fnKey];
  const disabled = ariaDisabled === 'true' || ariaDisabled === true;

  // Convert aria-disabled to proper boolean for native input
  const ariaDisabledAttr = disabled ? true : undefined;

  // Case 1: Static input (No function mapped)
  if (!fnKey || typeof fn !== 'function') {
    const commonProps: any = { ...rest, type, 'aria-disabled': ariaDisabledAttr };

    if (disabled) {
      Object.assign(commonProps, createAriaDisabledProps());
    }

    if (shouldUseDefaultChecked(type, role)) {
      return <input defaultChecked={checked} {...commonProps} />;
    }
    return <input {...commonProps} />;
  }

  // Case 2: Function-mapped input with event handling
  const wrapHandler = (handler: (e: any) => void) =>
    wrapWithAriaDisabledCheck(handler, disabled);

  const eventHandlers = {
    onClick: eventType === 'onClick'
      ? wrapHandler((e) => invokeMappedFunction(fn, e))
      : undefined,
    onInput: eventType === 'onInput'
      ? wrapHandler((e) => invokeMappedFunction(fn, e))
      : undefined,
    onChange: eventType === 'onChange' || !eventType
      ? wrapHandler((e) => invokeMappedFunction(fn, e))
      : undefined,
  };

  return <input type={type} checked={checked} aria-disabled={ariaDisabledAttr} {...rest} {...eventHandlers} />;
};
