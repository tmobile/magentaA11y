export interface BaseMarkdownElementProps {
  assetBasePath?: string;
}

export interface FunctionMappedProps {
  'data-fn'?: string;
  'data-event'?: 'onClick' | 'onChange' | 'onInput' | 'onMouseDown' | 'onMouseUp';
}

export interface AriaDisabledProps {
  'aria-disabled'?: string | boolean;
}

export type MarkdownEventHandler = (event: React.SyntheticEvent) => void;
