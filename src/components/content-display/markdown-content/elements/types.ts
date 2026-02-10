/**
 * Base properties for all markdown elements.
 */
export interface BaseMarkdownElementProps {
  /** Optional base path for resolving asset URLs (images, videos) */
  assetBasePath?: string;
}

/**
 * Properties for elements that can be mapped to custom functions.
 */
export interface FunctionMappedProps {
  /** The key for the function in the markdown function map */
  'data-fn'?: string;
  /** The event type that should trigger the function */
  'data-event'?: 'onClick' | 'onChange' | 'onInput' | 'onMouseDown' | 'onMouseUp';
}

/**
 * Properties for elements that support aria-disabled.
 */
export interface AriaDisabledProps {
  /** Indicates if the element is disabled from an accessibility perspective */
  'aria-disabled'?: string | boolean;
}

/**
 * Standard event handler type for markdown elements.
 */
export type MarkdownEventHandler = (event: React.SyntheticEvent) => void;
