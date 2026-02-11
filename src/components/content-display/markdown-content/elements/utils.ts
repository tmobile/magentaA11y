/**
 * Invokes a function if it's a valid function type.
 */
export const invokeMappedFunction = (fn: unknown, event: unknown): void => {
  if (typeof fn === 'function') {
    (fn as (ev: unknown) => void)(event);
  }
};

/**
 * Checks if the aria-disabled property is set to 'true' or true.
 */
export const isAriaDisabled = (props: Record<string, unknown>): boolean => {
  return props['aria-disabled'] === 'true' || props['aria-disabled'] === true;
};

/**
 * Wraps an event handler with a check for the disabled state.
 * If disabled, prevents the default action and returns early.
 */
export const wrapWithAriaDisabledCheck = (
  handler: (e: React.SyntheticEvent) => void,
  disabled: boolean
) => (e: React.SyntheticEvent) => {
  if (disabled) {
    e.preventDefault();
    return;
  }
  handler(e);
};

/**
 * Resolves an asset URL based on the provided source and base path.
 * If the source is an absolute URL (starts with http), it's returned as is.
 */
export const resolveAssetUrl = (
  src: string | undefined,
  basePath: string | undefined
): string | undefined => {
  if (!src) return undefined;
  if (src.startsWith('http')) return src;
  if (!basePath) return src;
  return `${basePath}/${src}`;
};
