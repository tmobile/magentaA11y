import React from 'react';
import { FunctionMappedProps, AriaDisabledProps } from '../types';

export interface MarkdownInputProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'aria-disabled'>,
          FunctionMappedProps,
          AriaDisabledProps {
  type?: string;
  checked?: boolean;
  role?: string;
  markdownFunctionMap: Record<string, (event: React.MouseEvent<Element>) => void>;
}
