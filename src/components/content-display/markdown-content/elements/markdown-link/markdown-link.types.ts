import React from 'react';
import { FunctionMappedProps } from '../types';

export interface MarkdownLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
          FunctionMappedProps {
  href?: string;
  children?: React.ReactNode;
  markdownFunctionMap: Record<string, (event: React.MouseEvent<Element>) => void>;
}
