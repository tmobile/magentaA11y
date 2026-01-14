export const invokeMappedFunction = (fn: unknown, event: unknown): void => {
  if (typeof fn === 'function') {
    (fn as (ev: unknown) => void)(event);
  }
};

export const isAriaDisabled = (props: Record<string, unknown>): boolean => {
  return props['aria-disabled'] === 'true' || props['aria-disabled'] === true;
};

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

export const resolveAssetUrl = (
  src: string | undefined,
  basePath: string | undefined
): string | undefined => {
  if (!src) return undefined;
  if (src.startsWith('http')) return src;
  if (!basePath) return src;
  return `${basePath}/${src}`;
};
