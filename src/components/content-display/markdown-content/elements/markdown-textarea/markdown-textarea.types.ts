import React from 'react';
import { FunctionMappedProps } from '../types';

/**
 * Props for the MarkdownTextarea component.
 */
export interface MarkdownTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
          FunctionMappedProps {
  /** Map of function keys to their respective event handler functions */
  markdownFunctionMap: Record<string, (event: React.MouseEvent<Element>) => void>;
}
