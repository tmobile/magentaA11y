import React from 'react';
import { FunctionMappedProps } from '../types';

export interface MarkdownDivProps
  extends React.HTMLAttributes<HTMLDivElement>,
          FunctionMappedProps {
  markdownFunctionMap: Record<string, (event: React.MouseEvent<Element>) => void>;
}
