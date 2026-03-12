import React from 'react';
import { FunctionMappedProps } from '../types';

interface MarkdownTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
          FunctionMappedProps {
  markdownFunctionMap: Record<string, (event: React.MouseEvent<Element>) => void>;
}

export const MarkdownTextarea: React.FC<MarkdownTextareaProps> = ({
  markdownFunctionMap,
  'data-fn': fnKey,
  'data-event': eventType = 'onInput',
  ...rest
}) => {
  const fn = fnKey && markdownFunctionMap[fnKey];

  if (!fnKey || typeof fn !== 'function') {
    return <textarea {...rest} />;
  }

  const eventHandlers = {
    onInput: eventType === 'onInput'
      ? (e: React.FormEvent<HTMLTextAreaElement>) => fn(e as any)
      : undefined,
    onChange: eventType === 'onChange'
      ? (e: React.ChangeEvent<HTMLTextAreaElement>) => fn(e as any)
      : undefined,
  };

  return <textarea {...rest} {...eventHandlers} />;
};
