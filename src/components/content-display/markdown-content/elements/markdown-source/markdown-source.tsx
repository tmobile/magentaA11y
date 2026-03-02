import React from 'react';
import { MarkdownSourceProps } from './markdown-source.types';
import { resolveAssetUrl } from '../utils';

/**
 * Component for rendering <source> elements within markdown video components.
 * Resolves the source URL using the asset base path.
 */
export const MarkdownSource: React.FC<MarkdownSourceProps> = ({
  src,
  type,
  assetBasePath
}) => {
  let resolvedSrc = resolveAssetUrl(src, assetBasePath);
  // Append #t=0.1 to local sources so Safari preloads the first frame
  if (resolvedSrc && !resolvedSrc.startsWith('http')) {
    resolvedSrc = `${resolvedSrc}#t=0.1`;
  }
  return <source src={resolvedSrc} type={type} />;
};
