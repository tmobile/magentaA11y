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
  const resolvedSrc = resolveAssetUrl(src, assetBasePath);
  return <source src={resolvedSrc} type={type} />;
};
