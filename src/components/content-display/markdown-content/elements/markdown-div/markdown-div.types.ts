import React from 'react';
import { FunctionMappedProps } from '../types';

/**
 * Props for the MarkdownDiv component.
 */
export interface MarkdownDivProps
  extends React.HTMLAttributes<HTMLDivElement>,
          FunctionMappedProps {
  /** Map of function keys to their respective event handler functions */
  markdownFunctionMap: Record<string, (event: React.MouseEvent<Element>) => void>;
}
