import React from 'react';
import { ButtonType } from 'components/custom-components/buttons/button-types';
import { Icon } from 'shared/Icons';
import { FunctionMappedProps } from '../types';

export interface MarkdownButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'aria-disabled'>,
          FunctionMappedProps {
  type?: ButtonType | string;
  'data-icon'?: Icon | string;
  'aria-label'?: string;
  'aria-disabled'?: string | boolean;
  children?: React.ReactNode;
  markdownFunctionMap: Record<string, (event: React.MouseEvent<Element>) => void>;
}
