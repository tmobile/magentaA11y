import React from 'react';
import { MarkdownSourceProps } from './markdown-source.types';
import { resolveAssetUrl } from '../utils';

export const MarkdownSource: React.FC<MarkdownSourceProps> = ({
  src,
  type,
  assetBasePath
}) => {
  const resolvedSrc = resolveAssetUrl(src, assetBasePath);
  return <source src={resolvedSrc} type={type} />;
};
